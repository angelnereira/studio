"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireSession() {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    return session;
}

export async function markEmailRead(id: string, read = true) {
    await requireSession();
    await prisma.inboundEmail.update({
        where: { id },
        data: { read },
    });
    revalidatePath("/admin/inbox");
    revalidatePath(`/admin/inbox/${id}`);
    revalidatePath("/admin");
}

export async function archiveEmail(id: string, archived = true) {
    await requireSession();
    await prisma.inboundEmail.update({
        where: { id },
        data: { archived },
    });
    revalidatePath("/admin/inbox");
    revalidatePath(`/admin/inbox/${id}`);
}

export async function deleteInboundEmail(id: string) {
    await requireSession();
    await prisma.inboundEmail.delete({ where: { id } });
    revalidatePath("/admin/inbox");
}

export async function getUnreadInboundCount(): Promise<number> {
    try {
        return await prisma.inboundEmail.count({ where: { read: false, archived: false } });
    } catch {
        return 0;
    }
}

const ReplySchema = z.object({
    inboundId: z.string().min(1),
    subject: z.string().min(1),
    body: z.string().min(1),
});

export type ReplyState = {
    success?: boolean;
    message?: string;
};

export async function replyToInbound(
    _prev: ReplyState,
    formData: FormData,
): Promise<ReplyState> {
    await requireSession();

    const parsed = ReplySchema.safeParse({
        inboundId: formData.get("inboundId"),
        subject: formData.get("subject"),
        body: formData.get("body"),
    });

    if (!parsed.success) {
        return { success: false, message: "Invalid reply data" };
    }

    const inbound = await prisma.inboundEmail.findUnique({
        where: { id: parsed.data.inboundId },
    });

    if (!inbound) {
        return { success: false, message: "Inbound email not found" };
    }

    if (!process.env.RESEND_API_KEY) {
        return { success: false, message: "RESEND_API_KEY is not configured" };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = "Ángel Nereira <contact@angelnereira.com>";

        const { error } = await resend.emails.send({
            from,
            to: inbound.fromEmail,
            subject: parsed.data.subject,
            html: `<div style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(parsed.data.body)}</div>`,
            text: parsed.data.body,
            headers: inbound.messageId ? { "In-Reply-To": inbound.messageId, References: inbound.messageId } : undefined,
        });

        if (error) {
            return { success: false, message: error.message };
        }

        await prisma.inboundEmail.update({
            where: { id: inbound.id },
            data: { read: true },
        });

        if (inbound.contactId) {
            await prisma.activityLog.create({
                data: {
                    type: "email_sent",
                    title: `Replied: ${parsed.data.subject}`,
                    contactId: inbound.contactId,
                    metadata: { inboundId: inbound.id, inReplyTo: inbound.messageId },
                },
            });
        }

        revalidatePath("/admin/inbox");
        revalidatePath(`/admin/inbox/${inbound.id}`);

        return { success: true, message: "Reply sent" };
    } catch (error) {
        console.error("[inbox.replyToInbound] error", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to send reply",
        };
    }
}

function escapeHtml(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
