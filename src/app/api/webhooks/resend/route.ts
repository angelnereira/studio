
import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"

// Resend Webhooks: https://resend.com/docs/dashboard/webhooks/events
// We expect a text body to verify signature or JSON depending on config.
// Resend sends a JSON body like:
/*
{
  "type": "email.delivered",
  "created_at": "2023-02-22T23:41:12.026Z",
  "data": {
    "created_at": "2023-02-22T23:41:11.894Z",
    "email_id": "d043d8e5-7b56-4c46-9e63-472093557903",
    "from": "Acme <onboarding@resend.dev>",
    "to": ["delivered@resend.dev"],
    "subject": "hello world",
    "tags": [{ "name": "campaignId", "value": "..." }] 
  }
}
*/

export async function POST(req: Request) {
    try {
        const payload = await req.json()
        const { type, data } = payload

        console.log("Resend Webhook:", type, data)

        if (!data || !type) {
            return new NextResponse("Invalid Payload", { status: 400 })
        }

        // Extract Metadata (Tags)
        // Tags come as array: [{ name: 'key', value: 'val' }]
        const tags = data.tags || []
        const campaignIdTag = tags.find((t: any) => t.name === 'campaignId')
        const campaignId = campaignIdTag ? campaignIdTag.value : null

        // If we don't have a campaign ID, we can't associate metrics easily unless we rely on 'to' address and time
        // But for this 'Marketing Studio', we assume we only care about tagged campaigns
        if (!campaignId) {
            return new NextResponse("Ignored: No Campaign ID", { status: 200 })
        }

        const email = Array.isArray(data.to) ? data.to[0] : data.to

        // Update Stats based on Event Type
        // We update the CampaignRecipient record first

        // Find the recipient record. We look for 'pending' or 'sent' etc.
        // Since we didn't store the Resend Email ID on creation (batch send returns valid IDs but we didn't map them 1:1 in the massive loop efficiently to DB),
        // we use Email + CampaignID as the key.

        let recipientRecord = await prisma.campaignRecipient.findFirst({
            where: {
                campaignId: campaignId,
                email: email
            }
        })

        // If no recipient record found (e.g. somehow missed or test email), we could ignore or create one.
        // Let's create one if missing for robustness?
        if (!recipientRecord) {
            // Optional: Create ad-hoc recipient log
            // await prisma.campaignRecipient.create(...)
            // Return for now to avoid noise
            return new NextResponse("Recipient not found in DB", { status: 200 })
        }

        // Update logic
        const now = new Date()

        if (type === 'email.delivered') {
            await prisma.campaignRecipient.update({
                where: { id: recipientRecord.id },
                data: { status: 'delivered' }
            })
            // Increment campaign stats
            await prisma.emailCampaign.update({
                where: { id: campaignId },
                data: { statsDelivered: { increment: 1 } }
            })
        }
        else if (type === 'email.opened') {
            // Only count if not already opened to avoid double counting unique opens? 
            // Or count total? Usually Open Rate is unique opens. 
            // We'll update the 'openedAt' timestamp.
            if (!recipientRecord.openedAt) {
                await prisma.campaignRecipient.update({
                    where: { id: recipientRecord.id },
                    data: { status: 'opened', openedAt: now }
                })
                await prisma.emailCampaign.update({
                    where: { id: campaignId },
                    data: { statsOpened: { increment: 1 } }
                })
            }
        }
        else if (type === 'email.clicked') {
            if (!recipientRecord.clickedAt) {
                await prisma.campaignRecipient.update({
                    where: { id: recipientRecord.id },
                    data: { clickedAt: now }
                })
                await prisma.emailCampaign.update({
                    where: { id: campaignId },
                    data: { statsClicked: { increment: 1 } }
                })
            }
        }
        else if (type === 'email.bounced') {
            await prisma.campaignRecipient.update({
                where: { id: recipientRecord.id },
                data: { status: 'bounced' }
            })
            // Decrement delivered if it was counted?
            // Usually bounced happens instead of delivered or after. Resend sends 'sent' then 'bounced' or 'delivered'.
        }

        return new NextResponse("Webhook Processed", { status: 200 })

    } catch (error) {
        console.error("Webhook Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
