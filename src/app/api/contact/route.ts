import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createRateLimiter, getClientIp } from '@/lib/rate-limit';
import { ContactSchema } from '@/lib/schemas';

// Geçici (Placeholder) Resend API Key
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_123');

// Rate limit ayarları (bkz. lib/rate-limit.ts — sayaçlar sunucu belleğinde tutulur).
// 1) Aynı IP'den gelen istekler: kötüye kullanımı ve art arda denemeleri sınırlar.
const PER_IP_LIMIT = 5;
const PER_IP_WINDOW_MS = 10 * 60 * 1000; // 10 dakika
// 2) Tüm ziyaretçilerden gönderilen toplam e-posta: IP değiştirilse bile Resend kotasını korur.
const GLOBAL_SEND_LIMIT = 30;
const GLOBAL_SEND_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 saat

const ipLimiter = createRateLimiter(PER_IP_LIMIT, PER_IP_WINDOW_MS);
const globalSendLimiter = createRateLimiter(GLOBAL_SEND_LIMIT, GLOBAL_SEND_WINDOW_MS);

function tooManyRequests(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: 'Too many requests' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
  );
}

export async function POST(request: Request) {
  const ipLimit = ipLimiter(getClientIp(request));
  if (!ipLimit.allowed) {
    return tooManyRequests(ipLimit.retryAfterSeconds);
  }

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

  // Yalnızca gerçekten gönderilecek (doğrulamayı geçmiş) mesajlar toplam kotadan düşer.
  const globalLimit = globalSendLimiter('all');
  if (!globalLimit.allowed) {
    console.warn('Contact form: global send limit reached; request rejected.');
    return tooManyRequests(globalLimit.retryAfterSeconds);
  }

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
