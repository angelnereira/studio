
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome-template';

// Initialize Resend with API Key from environment
const resend = new Resend(process.env.RESEND_API_KEY_SEND);

/**
 * Send a professional email using React Email templates
 * @param to Recipient email
 * @param subject Email subject
 * @param name Client name for personalization
 */
export async function sendWelcomeEmail(to: string, name: string) {
    if (!process.env.RESEND_API_KEY_SEND) {
        console.warn("RESEND_API_KEY_SEND is missing. Email not sent.");
        return { success: false, error: "Missing API Key" };
    }

    try {
        const data = await resend.emails.send({
            from: 'Angel Nereira <contact@angelnereira.com>', // Update with your verified domain
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
