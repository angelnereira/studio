import { Webhook } from "svix";

/**
 * Verify a Resend webhook signature using Svix headers.
 * Throws if invalid. Returns the parsed payload when valid.
 *
 * When RESEND_WEBHOOK_SECRET is not configured we skip verification but log a
 * warning — this keeps local dev from blowing up while making misconfiguration
 * obvious in production logs.
 */
export function verifyResendWebhook(rawBody: string, headers: Headers): unknown {
    const secret = process.env.RESEND_WEBHOOK_SECRET;
    if (!secret) {
        console.warn(
            "[resend-webhook] RESEND_WEBHOOK_SECRET not set — skipping signature verification.",
        );
        return JSON.parse(rawBody);
    }

    const svixId = headers.get("svix-id");
    const svixTimestamp = headers.get("svix-timestamp");
    const svixSignature = headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
        throw new Error("Missing Svix signature headers");
    }

    const wh = new Webhook(secret);
    return wh.verify(rawBody, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
    });
}
