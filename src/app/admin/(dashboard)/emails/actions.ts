'use server'

import { auth } from "@/auth"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { WelcomeEmail, ServiceInquiryEmail, NewsletterEmail, ProjectCompleteEmail } from "@/emails/index"
import * as React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

const EmailSchema = z.object({
    recipientType: z.enum(["individual", "all", "clients", "employers"]),
    specificEmail: z.string().email().optional().or(z.literal('')),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
})

const TemplateEmailSchema = z.object({
    specificEmail: z.string().email(),
    templateId: z.string(),
    templateData: z.string() // JSON string
})

export type EmailState = {
    success?: boolean
    message?: string | null
    errors?: {
        [key: string]: string[]
    }
}

const TEMPLATE_MAP: Record<string, any> = {
    "welcome": WelcomeEmail,
    "proposal": ProjectCompleteEmail, // Using ProjectComplete as base for Proposal for now
    "service-inquiry": ServiceInquiryEmail,
    "newsletter": NewsletterEmail
}

const TEMPLATE_SUBJECTS: Record<string, string> = {
    "welcome": "Welcome to Angel Nereira Studio",
    "proposal": "Project Proposal & Next Steps",
    "service-inquiry": "Re: Your Service Inquiry",
    "newsletter": "Latest Updates from Angel Nereira"
}

export async function sendEmailAction(prevState: EmailState, formData: FormData) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    const rawData = {
        recipientType: formData.get("recipientType"),
        specificEmail: formData.get("specificEmail"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    }

    const validated = EmailSchema.safeParse(rawData)

    if (!validated.success) {
        return {
            success: false,
            errors: validated.error.flatten().fieldErrors as any,
            message: "Validation Error",
        }
    }

    const { recipientType, specificEmail, subject, message } = validated.data

    let recipients: string[] = []

    // Determine recipients
    try {
        if (recipientType === "individual") {
            if (!specificEmail) return { success: false, message: "Email is required for individual send." }
            recipients = [specificEmail]
        } else {
            // Fetch from CRM
            let whereClause = {}
            if (recipientType === "clients") whereClause = { formType: "client" }
            if (recipientType === "employers") whereClause = { formType: "employer" }

            const contacts = await prisma.contact.findMany({
                where: whereClause,
                select: { email: true }
            })

            // Filter unique valid emails
            recipients = [...new Set(contacts.map(c => c.email).filter(e => e && e.includes("@")))]
        }

        if (recipients.length === 0) {
            return { success: false, message: "No recipients found for this selection." }
        }

        if (recipients.length === 1) {
            await resend.emails.send({
                from: "Ángel Nereira <contact@angelnereira.com>",
                to: recipients[0],
                subject: subject,
                html: `<div style="font-family: sans-serif; white-space: pre-wrap;">${message}</div>`,
            })
        } else {
            await resend.emails.send({
                from: "Ángel Nereira <contact@angelnereira.com>",
                to: "contact@angelnereira.com", // Send to self
                bcc: recipients,
                subject: subject,
                html: `<div style="font-family: sans-serif; white-space: pre-wrap;">${message}</div>`,
            })
        }

        // Log Activity
        await prisma.activityLog.create({
            data: {
                type: "email_sent",
                title: `Sent "${subject}"`,
                contactId: recipients.length === 1 ? (await prisma.contact.findFirst({ where: { email: recipients[0] } }))?.id : undefined,
                metadata: {
                    subject,
                    recipientCount: recipients.length,
                    recipientType
                }
            }
        })

        return { success: true, message: `Email sent successfully to ${recipients.length} recipients.` }

    } catch (error) {
        console.error("Email Error:", error)
        return { success: false, message: "Failed to send email via Resend API." }
    }
}

export async function sendTemplateEmailAction(prevState: EmailState, formData: FormData) {
    const session = await auth()
    if (!session?.user) return { success: false, message: "Unauthorized" }

    const rawData = {
        specificEmail: formData.get("specificEmail"),
        templateId: formData.get("templateId"),
        templateData: formData.get("templateData"),
    }

    const validated = TemplateEmailSchema.safeParse(rawData)

    if (!validated.success) {
        return { success: false, message: "Invalid template data" }
    }

    const { specificEmail, templateId, templateData } = validated.data

    try {
        const data = JSON.parse(templateData)
        const TemplateComponent = TEMPLATE_MAP[templateId]

        if (!TemplateComponent) {
            return { success: false, message: "Invalid Template ID" }
        }

        const subject = TEMPLATE_SUBJECTS[templateId] || "Update from Angel Nereira"

        await resend.emails.send({
            from: "Ángel Nereira <contact@angelnereira.com>",
            to: specificEmail,
            subject: subject,
            react: React.createElement(TemplateComponent, data)
        })

        // Log Activity
        await prisma.activityLog.create({
            data: {
                type: "template_sent",
                title: `Sent Template "${TEMPLATE_SUBJECTS[templateId]}"`,
                contactId: (await prisma.contact.findFirst({ where: { email: specificEmail } }))?.id,
                metadata: {
                    templateId,
                    subject,
                    recipient: specificEmail
                }
            }
        })

        return { success: true, message: "Template email sent successfully!" }

    } catch (error) {
        console.error("Template Send Error:", error)
        return { success: false, message: "Failed to send template email." }
    }
}
