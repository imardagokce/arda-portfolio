/**
 * Basit, bellek içi (in-memory) rate limiter — sabit pencere (fixed window).
 *
 * Sayaçlar çalışan sunucu sürecinin belleğinde tutulur; ek servis ya da paket gerektirmez.
 * Sınırı: süreç yeniden başladığında sıfırlanır ve birden fazla sunucu örneği (ör. serverless
 * ortamda aynı anda çalışan fonksiyonlar) sayaçları paylaşmaz. Kişisel bir site için temel
 * koruma sağlar; kesin bir üst sınır gerekiyorsa paylaşımlı bir depo (ör. Redis) gerekir.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** İstek reddedildiyse pencerenin dolmasına kalan süre (saniye); izin verildiyse 0. */
  retryAfterSeconds: number;
}

/** Bellek kullanımını sınırlamak için aynı anda tutulan en fazla anahtar sayısı. */
const MAX_KEYS = 5000;

/**
 * `windowMs` süresi içinde anahtar başına en fazla `limit` isteğe izin veren bir limiter oluşturur.
 * Her limiter kendi sayaçlarını tutar; birinin dolması ya da sıfırlanması diğerini etkilemez.
 * Dönen fonksiyonun her çağrısı, izin verildiği sürece ilgili anahtarın sayacını bir artırır.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const buckets = new Map<string, Bucket>();

  function makeRoom(now: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
    // Süresi dolmamış çok fazla anahtar birikmişse (ör. sahte IP seli) belleği korumak için sıfırla.
    if (buckets.size >= MAX_KEYS) buckets.clear();
  }

  return function check(key: string, now: number = Date.now()): RateLimitResult {
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      if (!bucket && buckets.size >= MAX_KEYS) makeRoom(now);
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (bucket.count >= limit) {
      return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
    }

    bucket.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  };
}

/**
 * İsteği yapanın IP adresini proxy başlıklarından okur.
 * Barındırma sağlayıcısı (ör. Vercel) bu başlıkları kendisi yazar; yerelde başlık yoksa 'unknown' döner.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
