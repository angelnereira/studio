'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const resend = new Resend(process.env.RESEND_API_KEY)

// --- Schemas ---

export const SenderIdentitySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
})

export const TemplateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    subject: z.string().min(1, "Subject is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().optional(),
})

export const CampaignSchema = z.object({
    name: z.string().min(2, "Internal name is required"),
    subject: z.string().min(1, "Subject is required"),
    content: z.string().min(1, "Content is required"),
    senderId: z.string().min(1, "Sender Identity is required"),
    templateId: z.string().optional(),
    audienceFilter: z.record(z.any()).optional(), // { formType: 'client', ... }
    audienceFilter: z.record(z.any()).optional(), // { formType: 'client', ... }
    scheduledAt: z.date().optional(),
    attachments: z.array(z.object({
        filename: z.string(),
        content: z.string(), // Base64
        // type: z.string().optional() // Content-Type
    })).optional()
})

// --- Sender Identity Actions ---

export async function getSenderIdentities() {
    const session = await auth()
    if (!session?.user) return []
    return await prisma.senderIdentity.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createSenderIdentity(data: z.infer<typeof SenderIdentitySchema>) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    const validated = SenderIdentitySchema.safeParse(data)
    if (!validated.success) return { success: false, message: "Invalid data" }

    try {
        await prisma.senderIdentity.create({
            data: {
                name: validated.data.name,
                email: validated.data.email,
                verified: true // Manual verification for now
            }
        })
        revalidatePath('/admin/emails')
        return { success: true, message: "Identity created" }
    } catch (error) {
        return { success: false, message: "Failed to create identity" }
    }
}

export async function deleteSenderIdentity(id: string) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    await prisma.senderIdentity.delete({ where: { id } })
    revalidatePath('/admin/emails')
    return { success: true, message: "Deleted" }
}

// --- Template Actions ---

export async function getTemplates() {
    const session = await auth()
    if (!session?.user) return []
    return await prisma.emailTemplate.findMany({ orderBy: { updatedAt: 'desc' } })
}

export async function createTemplate(data: z.infer<typeof TemplateSchema>) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    const validated = TemplateSchema.safeParse(data)
    if (!validated.success) return { success: false, message: "Invalid data" }

    try {
        await prisma.emailTemplate.create({
            data: validated.data
        })
        revalidatePath('/admin/emails')
        return { success: true, message: "Template saved" }
    } catch (e) {
        return { success: false, message: "Failed to save template" }
    }
}

// --- Campaign Actions ---

export async function saveCampaignDraft(data: z.infer<typeof CampaignSchema> & { id?: string }) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    const validated = CampaignSchema.safeParse(data)
    if (!validated.success) return { success: false, message: validated.error.message }

    try {
        let campaignId = data.id;

        if (data.id) {
            await prisma.emailCampaign.update({
                where: { id: data.id },
                data: validated.data
            })
        } else {
            const created = await prisma.emailCampaign.create({
                data: validated.data
            })
            campaignId = created.id
        }
        revalidatePath('/admin/emails')
        return { success: true, message: "Draft saved", id: campaignId }
    } catch (e) {
        return { success: false, message: "Failed to save draft" }
    }
}

export async function sendCampaign(campaignId: string) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    const campaign = await prisma.emailCampaign.findUnique({
        where: { id: campaignId },
        include: { sender: true }
    })

    if (!campaign) return { success: false, message: "Campaign not found" }
    if (campaign.status === 'completed') return { success: false, message: "Campaign already sent" }

    // 1. Fetch Audience
    // audienceFilter logic: { recipientType: 'clients' } or similar
    const filter = campaign.audienceFilter as any || {}
    let recipients: string[] = []

    if (filter.recipientType === 'individual' && filter.specificEmail) {
        recipients = [filter.specificEmail]
    } else {
        const whereClause: any = {}
        if (filter.recipientType === 'clients') whereClause.formType = 'client'
        if (filter.recipientType === 'employers') whereClause.formType = 'employer'
        // 'all' implies no filter (or just all contacts)

        const contacts = await prisma.contact.findMany({
            where: whereClause,
            select: { id: true, email: true, name: true }
        })
        // Filter valid emails
        recipients = contacts.map(c => c.email).filter(e => e && e.includes('@'))
    }

    if (recipients.length === 0) return { success: false, message: "No recipients found" }

    // 2. Track Recipients & Send
    // Use Resend Batch API if possible, or loop. Resend supports 100 max per batch.

    // If we have a scheduled date, we mark as scheduled, otherwise sending
    const isScheduled = !!campaign.scheduledAt && new Date(campaign.scheduledAt) > new Date();

    await prisma.emailCampaign.update({
        where: { id: campaign.id },
        data: {
            status: isScheduled ? 'scheduled' : 'sending',
            recipientCount: recipients.length,
            statsSent: isScheduled ? 0 : recipients.length // Only count as sent if sending now? Or count as targeted? Let's count sent when actually sent.
        }
    })

    try {
        const from = `${campaign.sender.name} <${campaign.sender.email}>`

        // Simple loop for now (Robust queue recommended for production > 1000)
        // For broadcast, we can use BCC to self to save API calls? 
        // Marketing best practice is individual emails to allow tracking pixels per user.
        // Let's do individual sends for 'tracking' support (to be added) or batches of 'to'.

        // Initialize Recipient Records for Tracking
        await prisma.campaignRecipient.createMany({
            data: recipients.map(email => ({
                campaignId: campaign.id,
                email: email,
                status: 'pending'
            })),
            skipDuplicates: true
        })

        // Using batch endpoint is better
        const batchSize = 100
        for (let i = 0; i < recipients.length; i += batchSize) {
            const batch = recipients.slice(i, i + batchSize)

            // Resend Scheduled Sending
            // Note: Batch API for scheduling is supported but 'scheduled_at' must be ISO 8601 string.
            // If scheduled, Resend holds it.
            const scheduledAtISO = isScheduled && campaign.scheduledAt ? campaign.scheduledAt.toISOString() : undefined

            const emailBatch = batch.map(email => ({
                from,
                to: email,
                subject: campaign.subject,
                html: campaign.content,
                html: campaign.content,
                tags: [{ name: 'campaignId', value: campaign.id }],
                scheduledAt: scheduledAtISO, // Pass to Resend
                attachments: campaign.attachments ? (campaign.attachments as any[]) : undefined
            }))

            await resend.batch.send(emailBatch)
        }

        // Update status end
        if (isScheduled) {
            // It stays 'scheduled' until Resend sends it? 
            // Actually, since we offload to Resend, we can say it's 'scheduled' in our DB.
            // We might want a webhook for 'email.sent' to move it to 'completed' or 'sending'?
            // For now, leave as scheduled.
        } else {
            await prisma.emailCampaign.update({
                where: { id: campaign.id },
                data: {
                    status: 'completed',
                    sentAt: new Date(),
                    statsSent: recipients.length // Update sent count now
                }
            })
        }

        revalidatePath('/admin/emails')
        return { success: true, message: isScheduled ? `Scheduled for ${campaign.scheduledAt?.toLocaleString()}` : `Sent to ${recipients.length} recipients` }

        revalidatePath('/admin/emails')
        return { success: true, message: `Sent to ${recipients.length} recipients` }

    } catch (e) {
        console.error(e)
        const errorMsg = e instanceof Error ? e.message : "Unknown error"

        await prisma.emailCampaign.update({
            where: { id: campaign.id },
            data: { status: 'failed' }
        })
        return { success: false, message: `Failed: ${errorMsg}` }
    }
}

export async function getCampaigns() {
    const session = await auth()
    if (!session?.user) return []
    return await prisma.emailCampaign.findMany({
        orderBy: { createdAt: 'desc' },
        include: { sender: true }
    })
}
