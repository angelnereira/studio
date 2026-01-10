'use server'

import { auth } from "@/auth"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const EmailSchema = z.object({
    recipientType: z.enum(["individual", "all", "clients", "employers"]),
    specificEmail: z.string().email().optional().or(z.literal('')),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
})

export type EmailState = {
    success?: boolean
    message?: string | null
    errors?: {
        [K in keyof z.infer<typeof EmailSchema>]?: string[]
    }
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
            errors: validated.error.flatten().fieldErrors,
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

        // Send Emails (Batching logic is ideal for production, but simple loop works for small lists)
        // For Resend, we can send to multiple 'to' or 'bcc' if it's a broadcast.
        // Using BCC is better for privacy in broadcasts.

        if (recipients.length === 1) {
            await resend.emails.send({
                from: "Ángel Nereira <contact@angelnereira.com>",
                to: recipients[0],
                subject: subject,
                html: `<div style="font-family: sans-serif; white-space: pre-wrap;">${message}</div>`,
            })
        } else {
            // Broadcast via BCC to hide recipients from each other
            // Limit to 50 per batch usually, but Resend handles reasonable arrays.
            await resend.emails.send({
                from: "Ángel Nereira <contact@angelnereira.com>",
                to: "contact@angelnereira.com", // Send to self
                bcc: recipients,
                subject: subject,
                html: `<div style="font-family: sans-serif; white-space: pre-wrap;">${message}</div>`,
            })
        }

        return { success: true, message: `Email sent successfully to ${recipients.length} recipients.` }

    } catch (error) {
        console.error("Email Error:", error)
        return { success: false, message: "Failed to send email via Resend API." }
    }
}
