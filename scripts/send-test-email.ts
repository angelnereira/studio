import { Resend } from 'resend';

// NOTE: the hardcoded API key previously in this file has been revoked.
// Rotate your RESEND_API_KEY in the Resend dashboard if you haven't already.
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('RESEND_API_KEY is not set. Export it before running this script.');
  process.exit(1);
}

const resend = new Resend(apiKey);

const to = process.env.TEST_EMAIL_TO || 'angelnereira15@gmail.com';
const from = process.env.TEST_EMAIL_FROM || 'onboarding@resend.dev';

async function sendTestEmail() {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });

    console.log('Email sent successfully!');
    console.log('Response:', data);
  } catch (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  }
}

sendTestEmail();
