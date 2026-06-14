import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Geçici (Placeholder) Resend API Key
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_123');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
       await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL || 'youremail@example.com',
        subject: `Yeni Mesaj: ${subject}`,
        text: `İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
        replyTo: email,
      });
    } else {
      console.log(`[Resend Simülasyonu] Mesaj alındı: ${name} (${email}): ${subject}`);
      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
