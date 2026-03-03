'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import {
    SenderIdentitySchema,
    TemplateSchema,
    CampaignSchema,
    type SenderIdentityInput,
    type TemplateInput,
    type CampaignInput
} from "./schemas"

// Initialize Resend lazily to ensure environment variables are loaded
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not configured in environment variables");
    }
    return new Resend(apiKey);
}

interface AudienceFilter {
    recipientType?: 'individual' | 'clients' | 'employers' | 'all';
    specificEmail?: string;
}

interface EmailAttachment {
    filename: string;
    content: string; // base64
}

// --- Sender Identity Actions ---

export async function getSenderIdentities() {
    const session = await auth()
    if (!session?.user) return []
    return await prisma.senderIdentity.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createSenderIdentity(data: SenderIdentityInput) {
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

export async function createTemplate(data: TemplateInput) {
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

export async function saveCampaignDraft(data: CampaignInput & { id?: string }) {
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
    if (!campaign.sender.verified && !campaign.sender.email.endsWith('@resend.dev')) {
        return { success: false, message: "Sender identity is not verified. Please verify it in your Resend Dashboard or use a verified domain." }
    }

    // 1. Fetch Audience
    // audienceFilter logic: { recipientType: 'clients' } or similar
    const filter = (campaign.audienceFilter as unknown as AudienceFilter) || {}
    let recipients: string[] = []

    if (filter.recipientType === 'individual' && filter.specificEmail) {
        recipients = [filter.specificEmail]

        // Auto-save Contact if sending to individual
        // Check if contact exists, if not create.
        // We might not have a name, so use email part or "New Contact"
        try {
            const existing = await prisma.contact.findFirst({ where: { email: filter.specificEmail } })
            if (!existing) {
                await prisma.contact.create({
                    data: {
                        email: filter.specificEmail,
                        name: filter.specificEmail.split('@')[0], // Fallback name
                        formType: 'manual_entry'
                    }
                })
            }
        } catch (e) {
            console.error("Failed to auto-save contact", e)
            // Non-blocking
        }
    } else {
        const whereClause: import("@prisma/client").Prisma.ContactWhereInput = {}
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
        const resend = getResendClient();
        const from = `"${campaign.sender.name}" <${campaign.sender.email}>`

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
                tags: [{ name: 'campaignId', value: campaign.id }],
                scheduledAt: scheduledAtISO, // Pass to Resend
                attachments: campaign.attachments
                    ? (campaign.attachments as unknown as EmailAttachment[]).map(a => ({
                        filename: a.filename,
                        content: Buffer.from(a.content, 'base64')
                    }))
                    : undefined
            }))

            const { error: batchError } = await resend.batch.send(emailBatch)

            if (batchError) {
                console.error('Resend Batch API error:', batchError)
                return { success: false, message: `Resend Error: ${batchError.message}` }
            }

            // CRM Traceability: Log email sent activity for matching contacts
            try {
                const matchingContacts = await prisma.contact.findMany({
                    where: { email: { in: batch } },
                    select: { id: true, email: true }
                })
                for (const contact of matchingContacts) {
                    await prisma.activityLog.create({
                        data: {
                            contactId: contact.id,
                            type: 'email_sent',
                            title: `📧 Campaign: "${campaign.subject.slice(0, 50)}${campaign.subject.length > 50 ? '...' : ''}"`,
                            metadata: { campaignId: campaign.id, subject: campaign.subject },
                        }
                    })
                }
            } catch (logError) {
                console.error('Failed to log campaign activity:', logError)
                // Non-blocking: email was already sent
            }
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

export async function getContacts() {
    const session = await auth()
    if (!session?.user) return []
    return await prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true }
    })
}

export async function deleteCampaign(campaignId: string) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }
    try {
        await prisma.campaignRecipient.deleteMany({ where: { campaignId } })
        await prisma.emailCampaign.delete({ where: { id: campaignId } })
        revalidatePath('/admin/emails')
        return { success: true, message: "Campaign deleted" }
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "Delete failed" }
    }
}

export async function duplicateCampaign(campaignId: string) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }
    try {
        const original = await prisma.emailCampaign.findUnique({ where: { id: campaignId } })
        if (!original) return { success: false, message: "Campaign not found" }
        const copy = await prisma.emailCampaign.create({
            data: {
                name: `${original.name} (copy)`,
                subject: original.subject,
                content: original.content,
                senderId: original.senderId,
                audienceFilter: original.audienceFilter || {},
                status: 'draft',
            }
        })
        revalidatePath('/admin/emails')
        return { success: true, message: "Campaign duplicated", id: copy.id }
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "Duplicate failed" }
    }
}

export async function getCampaignStats(campaignId: string) {
    const session = await auth()
    if (!session?.user) return null
    const campaign = await prisma.emailCampaign.findUnique({
        where: { id: campaignId },
        include: {
            sender: true,
            recipients: {
                select: { status: true, email: true }
            }
        }
    })
    if (!campaign) return null
    const recipients = campaign.recipients || []
    return {
        id: campaign.id,
        name: campaign.name,
        subject: campaign.subject,
        status: campaign.status,
        createdAt: campaign.createdAt,
        senderName: campaign.sender?.name || 'Unknown',
        senderEmail: campaign.sender?.email || '',
        total: recipients.length,
        sent: recipients.filter(r => r.status === 'sent' || r.status === 'delivered' || r.status === 'opened' || r.status === 'clicked').length,
        delivered: recipients.filter(r => r.status === 'delivered' || r.status === 'opened' || r.status === 'clicked').length,
        opened: recipients.filter(r => r.status === 'opened' || r.status === 'clicked').length,
        clicked: recipients.filter(r => r.status === 'clicked').length,
        failed: recipients.filter(r => r.status === 'failed' || r.status === 'bounced').length,
    }
}

// ═══════════════════════════════════════
// QUICK SEND — Gmail-like direct send
// ═══════════════════════════════════════

const QuickSendSchema = z.object({
    to: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    html: z.string().min(1, "Email content is required"),
    senderId: z.string().min(1, "Sender is required"),
    attachments: z.array(z.object({
        filename: z.string(),
        content: z.string()
    })).optional(),
})

export async function sendQuickEmail(data: {
    to: string
    subject: string
    html: string
    senderId: string
    attachments?: { filename: string; content: string }[]
}) {
    try {
        const session = await auth()
        if (!session?.user) return { success: false, message: "Unauthorized" }

        const validated = QuickSendSchema.safeParse(data)
        if (!validated.success) {
            const errors = validated.error.flatten().fieldErrors
            const firstError = Object.values(errors).flat()[0] || "Invalid data"
            return { success: false, message: firstError }
        }

        const { to, subject, html, senderId, attachments } = validated.data

        const resend = getResendClient();
        // Get sender identity
        const sender = await prisma.senderIdentity.findUnique({ where: { id: senderId } })
        if (!sender) return { success: false, message: "Sender identity not found. Add one in Settings." }

        const from = `"${sender.name}" <${sender.email}>`

        // Send via Resend
        const { data: resendData, error: resendError } = await resend.emails.send({
            from,
            to,
            subject,
            html,
            attachments: attachments?.map((a: { filename: string; content: string }) => ({
                filename: a.filename,
                content: Buffer.from(a.content, 'base64')
            })),
        })

        if (resendError) {
            console.error('Resend API Error:', resendError)
            return { success: false, message: `Resend Error: ${resendError.message}` }
        }

        // Log to CRM activity
        try {
            const contact = await prisma.contact.findFirst({ where: { email: to } })
            await prisma.activityLog.create({
                data: {
                    type: 'email_sent',
                    title: `📧 Quick: "${subject.slice(0, 60)}${subject.length > 60 ? '...' : ''}"`,
                    contactId: contact?.id,
                    metadata: { to, subject, sender: sender.email },
                }
            })
        } catch (logError) {
            console.error('Failed to log email activity:', logError)
        }

        revalidatePath('/admin/emails')
        return { success: true, message: `Email sent to ${to}` }
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Internal Server Error"
        console.error('Fatal Quick send error:', error)
        return { success: false, message: msg }
    }
}

