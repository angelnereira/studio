import { Resend } from 'resend';

const resend = new Resend('re_78CR1zNc_P1pXUC4jZsYfk7mnseUcehfW');

async function sendTestEmail() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'angelnereira15@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    console.log('Email sent successfully!');
    console.log('Response:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
