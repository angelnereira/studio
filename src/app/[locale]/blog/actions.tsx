"use server"

import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import VerificationEmail from "@/emails/verification-template"
import { revalidatePath } from "next/cache"
import { randomBytes } from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

const SUBSCRIBER_TOKEN_PREFIX = "subscriber:"
const SUBSCRIBER_TOKEN_TTL_MS = 24 * 60 * 60 * 1000 // 24h

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
        const token = randomBytes(32).toString("hex")
        const expires = new Date(Date.now() + SUBSCRIBER_TOKEN_TTL_MS)

        await prisma.verificationToken.create({
            data: {
                identifier: `${SUBSCRIBER_TOKEN_PREFIX}${email}`,
                token,
                expires,
            },
        })

        const link = `${process.env.NEXT_PUBLIC_APP_URL || 'https://angelnereira.com'}/verify-subscriber?token=${token}`

        await resend.emails.send({
            from: 'Angel Nereira <onboarding@resend.dev>',
            to: email,
            subject: 'Verifica tu email para comentar',
            react: <VerificationEmail verificationLink={link} />
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
        const record = await prisma.verificationToken.findUnique({
            where: { token },
        })

        if (!record || !record.identifier.startsWith(SUBSCRIBER_TOKEN_PREFIX)) {
            return { success: false, error: "Invalid token" }
        }

        if (record.expires < new Date()) {
            await prisma.verificationToken.delete({ where: { token } }).catch(() => { })
            return { success: false, error: "Token expired" }
        }

        const email = record.identifier.slice(SUBSCRIBER_TOKEN_PREFIX.length)

        await prisma.subscriber.upsert({
            where: { email },
            update: { isVerified: true },
            create: { email, isVerified: true },
        })

        await prisma.verificationToken.delete({ where: { token } }).catch(() => { })

        return { success: true, email }
    } catch (error) {
        console.error("confirmVerification error:", error)
        return { success: false, error: "Invalid token" }
    }
}
