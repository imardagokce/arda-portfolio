import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { ContactSchema } from '@/lib/schemas';

// Geçici (Placeholder) Resend API Key
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_123');

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', fields: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    if (process.env.RESEND_API_KEY) {
      // Resend SDK hata durumunda istisna fırlatmaz; sonucu { data, error } olarak döndürür.
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL || 'youremail@example.com',
        subject: `Yeni Mesaj: ${subject}`,
        text: `İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
        replyTo: email,
      });

      if (error) {
        console.error('Contact form: Resend could not send the email:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
      }
    } else {
      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
