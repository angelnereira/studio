import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyResendWebhook } from "@/lib/resend-webhook";

/**
 * Resend Inbound webhook receiver.
 *
 * Resend sends an `email.received` event with the parsed message. We persist it
 * into the InboundEmail table (idempotent on messageId) and link it to a known
 * Contact when the sender matches one.
 *
 * Expected payload shape (Resend Inbound beta):
 * {
 *   type: "email.received",
 *   created_at: ISO,
 *   data: {
 *     email_id / id: string,
 *     from: { email, name } | string,
 *     to: [string] | string,
 *     subject: string,
 *     text?: string,
 *     html?: string,
 *     in_reply_to?: string,
 *     attachments?: [{ filename, content, content_type }],
 *     headers?: Record<string, string>
 *   }
 * }
 */

interface FromField {
    email?: string;
    name?: string;
}

interface InboundAttachment {
    filename?: string;
    content_type?: string;
    size?: number;
}

interface InboundPayload {
    type?: string;
    created_at?: string;
    data?: {
        id?: string;
        email_id?: string;
        message_id?: string;
        from?: FromField | string;
        to?: string | string[];
        subject?: string;
        text?: string;
        html?: string;
        in_reply_to?: string;
        attachments?: InboundAttachment[];
        headers?: Record<string, string>;
    };
}

function parseFrom(from: FromField | string | undefined): { email: string; name: string | null } {
    if (!from) return { email: "unknown@unknown", name: null };
    if (typeof from === "string") {
        const match = from.match(/^\s*(.*?)\s*<\s*([^>]+)\s*>\s*$/);
        if (match) return { name: match[1] || null, email: match[2] };
        return { email: from.trim(), name: null };
    }
    return { email: from.email || "unknown@unknown", name: from.name || null };
}

function parseTo(to: string | string[] | undefined): string {
    if (!to) return "";
    if (Array.isArray(to)) return to[0] || "";
    return to;
}

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();

        let payload: InboundPayload;
        try {
            payload = verifyResendWebhook(rawBody, req.headers) as InboundPayload;
        } catch (err) {
            console.warn("[resend-inbound] Signature verification failed:", err);
            return new NextResponse("Invalid signature", { status: 401 });
        }

        if (payload.type !== "email.received") {
            return new NextResponse("Ignored: not email.received", { status: 200 });
        }

        const data = payload.data;
        if (!data) {
            return new NextResponse("Invalid payload", { status: 400 });
        }

        const messageId = data.message_id || data.email_id || data.id;
        if (!messageId) {
            return new NextResponse("Missing message id", { status: 400 });
        }

        const { email: fromEmail, name: fromName } = parseFrom(data.from);
        const toEmail = parseTo(data.to);
        const subject = data.subject || "(no subject)";
        const receivedAt = payload.created_at ? new Date(payload.created_at) : new Date();

        const contact = await prisma.contact.findFirst({
            where: { email: fromEmail },
            select: { id: true },
        });

        const record = await prisma.inboundEmail.upsert({
            where: { messageId },
            update: {},
            create: {
                messageId,
                fromEmail,
                fromName,
                toEmail,
                subject,
                text: data.text ?? null,
                html: data.html ?? null,
                inReplyTo: data.in_reply_to ?? null,
                attachments: data.attachments ? (data.attachments as unknown as object) : undefined,
                receivedAt,
                contactId: contact?.id ?? null,
            },
        });

        if (contact?.id) {
            await prisma.activityLog.create({
                data: {
                    type: "email_received",
                    title: `Received: ${subject}`,
                    contactId: contact.id,
                    metadata: { messageId, fromEmail, subject },
                },
            });
        }

        return NextResponse.json({ ok: true, id: record.id });
    } catch (error) {
        console.error("[resend-inbound] Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
