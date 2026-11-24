/**
 * Cloudflare Turnstile jetonunun sunucu tarafında doğrulanması.
 *
 * TURNSTILE_SECRET_KEY tanımlı değilse doğrulama atlanır (yerel geliştirme ve anahtar girilmemiş
 * ortamlar için). Tanımlıysa jeton zorunludur; Cloudflare'e ulaşılamazsa istek reddedilir.
 */
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(token: unknown, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  // Cloudflare jetonları en fazla 2048 karakterdir.
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return false;
    const data: { success?: boolean } = await res.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}
