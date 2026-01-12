"use server"

import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import VerificationEmail from "@/emails/verification-template"
import { revalidatePath } from "next/cache"
import { render } from "@react-email/render"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitComment(postId: string, data: { name: string, email: string, content: string }) {
    try {
        // 1. Check if subscriber exists and is verified
        const subscriber = await prisma.subscriber.findUnique({
            where: { email: data.email }
        })

        if (!subscriber || !subscriber.isVerified) {
            // Create subscriber if not exists (unverified)
            if (!subscriber) {
                await prisma.subscriber.create({
                    data: { email: data.email, isVerified: false }
                })
            }
            return { success: false, error: "unverified_email" }
        }

        // 2. Create comment
        const comment = await prisma.comment.create({
            data: {
                content: data.content,
                postId: postId,
                authorName: data.name,
                authorEmail: data.email,
                isVerified: true
            }
        })

        revalidatePath(`/blog/${postId}`) // Revalidate might need slug, but postId is used for relation. Ideally we revalidate the page.
        // Assuming postId matches slug or we pass slug to revalidate. 
        // For now, let's revalidate the generic blog path or rely on client state update.

        return { success: true, comment }

    } catch (error) {
        console.error("Error submitting comment:", error)
        return { success: false, error: "Submission failed" }
    }
}

export async function verifySubscriber(email: string) {
    try {
        // Generate a simple verification link (In production, use a signed token/JWT)
        // For this demo, we'll just encode the email.
        // SECURITY NOTE: This is weak. Ideally use a separate VerificationToken table.
        const token = Buffer.from(email).toString('base64')
        const link = `${process.env.NEXT_PUBLIC_APP_URL || 'https://angelnereira.com'}/verify-subscriber?token=${token}`

        // Send Email
        await resend.emails.send({
            from: 'Angel Nereira <onboarding@resend.dev>', // Update with your verified domain
            to: email,
            subject: 'Verifica tu email para comentar',
            react: <VerificationEmail verificationLink={ link } />
        })

    return { success: true }
} catch (error) {
    console.error("Error sending verification:", error)
    return { success: false, error: "Failed to send email" }
}
}

// Action called by the verification page
export async function confirmVerification(token: string) {
    try {
        const email = Buffer.from(token, 'base64').toString('ascii')

        await prisma.subscriber.update({
            where: { email },
            data: { isVerified: true }
        })

        return { success: true, email }
    } catch (error) {
        return { success: false, error: "Invalid token" }
    }
}
