
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome-template';

// Initialize Resend with API Key from environment
// Initialize Resend lazily
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is missing");
    return new Resend(apiKey);
}

/**
 * Send a professional email using React Email templates
 * @param to Recipient email
 * @param subject Email subject
 * @param name Client name for personalization
 */
export async function sendWelcomeEmail(to: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is missing. Email not sent.");
        return { success: false, error: "Missing API Key" };
    }

    try {
        const resend = getResendClient();
        const data = await resend.emails.send({
            from: '"Angel Nereira" <contact@angelnereira.com>', // Update with your verified domain
            to: [to],
            subject: 'Bienvenido a Ángel Nereira Studio',
            react: WelcomeEmail({ name }),
        });

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error };
    }
}
