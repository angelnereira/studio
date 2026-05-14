
import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"
import { verifyResendWebhook } from "@/lib/resend-webhook"

// Resend Webhooks: https://resend.com/docs/dashboard/webhooks/events
// Resend sends a JSON body where `data.tags` may include:
//   - campaignId  → email-marketing campaign tracking
//   - applicationId / vacancyId → job-application tracking
// We dispatch by tag so this single endpoint serves both flows.

export async function POST(req: Request) {
    try {
        const rawBody = await req.text()
        let payload: { type?: string; data?: Record<string, unknown> }
        try {
            payload = verifyResendWebhook(rawBody, req.headers) as typeof payload
        } catch (err) {
            console.warn("[resend-webhook] Signature verification failed:", err)
            return new NextResponse("Invalid signature", { status: 401 })
        }

        const { type, data } = payload
        if (!data || !type) {
            return new NextResponse("Invalid Payload", { status: 400 })
        }

        const tags = (data.tags as { name: string; value: string }[] | undefined) || []
        const campaignId = tags.find((t) => t.name === 'campaignId')?.value ?? null
        const applicationId = tags.find((t) => t.name === 'applicationId')?.value ?? null

        const now = new Date()

        // ─── Application tracking (job applications) ───────────────────
        if (applicationId) {
            try {
                await updateApplicationFromEvent(applicationId, type, now)
            } catch (err) {
                console.error("[resend-webhook] application update failed:", err)
                // Non-fatal: continue so campaign branch can still run.
            }
        }

        // ─── Campaign tracking (email marketing) ───────────────────────
        if (campaignId) {
            const email = Array.isArray(data.to) ? (data.to as string[])[0] : (data.to as string)
            try {
                await updateCampaignFromEvent(campaignId, email, type, now)
            } catch (err) {
                console.error("[resend-webhook] campaign update failed:", err)
            }
        }

        if (!applicationId && !campaignId) {
            return new NextResponse("Ignored: No tracked tag", { status: 200 })
        }

        return new NextResponse("Webhook Processed", { status: 200 })
    } catch (error) {
        console.error("Webhook Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

async function updateApplicationFromEvent(
    applicationId: string,
    type: string,
    now: Date,
) {
    // We don't blindly upgrade status backwards. Once a recruiter has
    // "replied" / "interview" status, an "opened" event shouldn't downgrade it.
    const app = await prisma.application.findUnique({
        where: { id: applicationId },
        select: { id: true, status: true, openedAt: true, clickedAt: true, bouncedAt: true },
    })
    if (!app) return

    const terminalStatuses = ["replied", "interview", "rejected", "accepted"]
    const isTerminal = terminalStatuses.includes(app.status)

    if (type === "email.delivered") {
        await prisma.application.update({
            where: { id: applicationId },
            data: isTerminal ? {} : { status: "sent" },
        })
        return
    }

    if (type === "email.opened") {
        if (app.openedAt) return // dedupe
        await prisma.application.update({
            where: { id: applicationId },
            data: {
                openedAt: now,
                ...(isTerminal ? {} : { status: "opened" }),
            },
        })
        return
    }

    if (type === "email.clicked") {
        if (app.clickedAt) return
        await prisma.application.update({
            where: { id: applicationId },
            data: {
                clickedAt: now,
                // Don't change status — "clicked" is a stronger signal than
                // "opened" but the recruiter still hasn't actually replied.
            },
        })
        return
    }

    if (type === "email.bounced" || type === "email.complained") {
        await prisma.application.update({
            where: { id: applicationId },
            data: {
                bouncedAt: now,
                ...(isTerminal ? {} : { status: "rejected", notes: `[auto] ${type}` }),
            },
        })
        return
    }
}

async function updateCampaignFromEvent(
    campaignId: string,
    email: string,
    type: string,
    now: Date,
) {
    const recipientRecord = await prisma.campaignRecipient.findFirst({
        where: { campaignId, email },
    })
    if (!recipientRecord) return

    if (type === "email.delivered") {
        await prisma.campaignRecipient.update({
            where: { id: recipientRecord.id },
            data: { status: "delivered" },
        })
        await prisma.emailCampaign.update({
            where: { id: campaignId },
            data: { statsDelivered: { increment: 1 } },
        })
        return
    }

    if (type === "email.opened" && !recipientRecord.openedAt) {
        await prisma.campaignRecipient.update({
            where: { id: recipientRecord.id },
            data: { status: "opened", openedAt: now },
        })
        await prisma.emailCampaign.update({
            where: { id: campaignId },
            data: { statsOpened: { increment: 1 } },
        })
        return
    }

    if (type === "email.clicked" && !recipientRecord.clickedAt) {
        await prisma.campaignRecipient.update({
            where: { id: recipientRecord.id },
            data: { clickedAt: now },
        })
        await prisma.emailCampaign.update({
            where: { id: campaignId },
            data: { statsClicked: { increment: 1 } },
        })
        return
    }

    if (type === "email.bounced") {
        await prisma.campaignRecipient.update({
            where: { id: recipientRecord.id },
            data: { status: "bounced" },
        })
    }
}
