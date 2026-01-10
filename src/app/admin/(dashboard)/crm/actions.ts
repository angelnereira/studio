'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const StatusSchema = z.enum(["new", "contacted", "closed", "spam"])
const FormTypeSchema = z.enum(["client", "employer", "collaborator", "invitation"])

const CreateContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    formType: FormTypeSchema,
    company: z.string().optional(),
    service: z.string().optional(),
    message: z.string().optional(),
    tags: z.array(z.string()).optional(),
})

export type CreateContactInput = z.infer<typeof CreateContactSchema>

// Update contact status with activity logging
export async function updateContactStatus(id: string, newStatus: string) {
    const session = await auth()
    if (!session?.user) return { message: "Unauthorized" }

    const parsed = StatusSchema.safeParse(newStatus)
    if (!parsed.success) return { message: "Invalid status" }

    try {
        const contact = await prisma.contact.findUnique({ where: { id } })
        if (!contact) return { message: "Contact not found" }

        const oldStatus = contact.status

        await prisma.$transaction([
            prisma.contact.update({
                where: { id },
                data: { status: newStatus },
            }),
            // Log the activity
            prisma.activityLog.create({
                data: {
                    contactId: id,
                    type: "status_change",
                    title: `Status: ${oldStatus} → ${newStatus}`,
                    metadata: { oldStatus, newStatus },
                },
            }),
        ])

        revalidatePath("/admin/crm")
        return { message: "Status updated" }
    } catch (error) {
        console.error("Failed to update status:", error)
        return { message: "Failed to update status" }
    }
}

// Delete contact
export async function deleteContact(id: string) {
    const session = await auth()
    if (!session?.user) return { message: "Unauthorized" }

    try {
        await prisma.contact.delete({
            where: { id },
        })
        revalidatePath("/admin/crm")
        return { message: "Contact deleted" }
    } catch (error) {
        return { message: "Failed to delete contact" }
    }
}

// Add a note to a contact
export async function addContactNote(contactId: string, note: string) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    if (!note.trim()) return { success: false, message: "Note cannot be empty" }

    try {
        await prisma.activityLog.create({
            data: {
                contactId,
                type: "note",
                title: note.slice(0, 100), // First 100 chars as title
                metadata: { fullNote: note },
            },
        })

        revalidatePath("/admin/crm")
        return { success: true, message: "Note added" }
    } catch (error) {
        console.error("Failed to add note:", error)
        return { success: false, message: "Failed to add note" }
    }
}

// Get contact with activity history and email stats
export async function getContactWithHistory(contactId: string) {
    const session = await auth()
    if (!session?.user) return null

    try {
        const contact = await prisma.contact.findUnique({
            where: { id: contactId },
            include: {
                activityLogs: {
                    orderBy: { createdAt: "desc" },
                    take: 20, // Limit to last 20 activities
                },
                campaignRecipients: {
                    orderBy: { createdAt: "desc" },
                    take: 10,
                    include: {
                        campaign: {
                            select: {
                                id: true,
                                name: true,
                                subject: true,
                                sentAt: true,
                            },
                        },
                    },
                },
            },
        })

        return contact
    } catch (error) {
        console.error("Failed to get contact history:", error)
        return null
    }
}

// Log email sent activity (called from sendCampaign)
export async function logEmailSent(contactId: string, subject: string, campaignId?: string) {
    try {
        await prisma.activityLog.create({
            data: {
                contactId,
                type: "email_sent",
                title: `📧 Email: "${subject.slice(0, 50)}${subject.length > 50 ? '...' : ''}"`,
                metadata: { campaignId, subject },
            },
        })
    } catch (error) {
        console.error("Failed to log email sent:", error)
    }
}

// Get activity stats for dashboard
export async function getActivityStats() {
    const session = await auth()
    if (!session?.user) return null

    try {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const [emailsSent, statusChanges, recentActivity] = await Promise.all([
            prisma.activityLog.count({
                where: {
                    type: "email_sent",
                    createdAt: { gte: thirtyDaysAgo },
                },
            }),
            prisma.activityLog.count({
                where: {
                    type: "status_change",
                    createdAt: { gte: thirtyDaysAgo },
                },
            }),
            prisma.activityLog.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
                include: {
                    contact: {
                        select: { name: true, email: true },
                    },
                },
            }),
        ])

        return { emailsSent, statusChanges, recentActivity }
    } catch (error) {
        console.error("Failed to get activity stats:", error)
        return null
    }
}

// Create a new contact manually
export async function createContact(data: CreateContactInput) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    const parsed = CreateContactSchema.safeParse(data)
    if (!parsed.success) {
        return { success: false, message: parsed.error.errors[0]?.message || "Invalid data" }
    }

    try {
        const contact = await prisma.contact.create({
            data: {
                name: parsed.data.name,
                email: parsed.data.email,
                formType: parsed.data.formType,
                company: parsed.data.company,
                service: parsed.data.service,
                message: parsed.data.message,
                tags: parsed.data.tags || [],
                status: "new",
            },
        })

        // Log activity
        await prisma.activityLog.create({
            data: {
                contactId: contact.id,
                type: "note",
                title: "📥 Contact added manually",
            },
        })

        revalidatePath("/admin/crm")
        return { success: true, message: "Contact created", contactId: contact.id }
    } catch (error) {
        console.error("Failed to create contact:", error)
        return { success: false, message: "Failed to create contact" }
    }
}

// Update contact tags
export async function updateContactTags(contactId: string, tags: string[]) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    try {
        const contact = await prisma.contact.findUnique({ where: { id: contactId } })
        if (!contact) return { success: false, message: "Contact not found" }

        const oldTags = contact.tags || []
        const addedTags = tags.filter(t => !oldTags.includes(t))
        const removedTags = oldTags.filter(t => !tags.includes(t))

        await prisma.$transaction([
            prisma.contact.update({
                where: { id: contactId },
                data: { tags },
            }),
            // Log if there were changes
            ...(addedTags.length > 0 || removedTags.length > 0 ? [
                prisma.activityLog.create({
                    data: {
                        contactId,
                        type: "note",
                        title: `🏷️ Tags updated: ${tags.length > 0 ? tags.join(", ") : "none"}`,
                        metadata: { oldTags, newTags: tags, addedTags, removedTags },
                    },
                }),
            ] : []),
        ])

        revalidatePath("/admin/crm")
        return { success: true, message: "Tags updated" }
    } catch (error) {
        console.error("Failed to update tags:", error)
        return { success: false, message: "Failed to update tags" }
    }
}

// Get all unique tags used across contacts (for autocomplete)
export async function getAllTags() {
    const session = await auth()
    if (!session?.user) return []

    try {
        const contacts = await prisma.contact.findMany({
            select: { tags: true },
        })

        const allTags = contacts.flatMap(c => c.tags || [])
        const uniqueTags = [...new Set(allTags)].sort()
        return uniqueTags
    } catch (error) {
        console.error("Failed to get tags:", error)
        return []
    }
}
