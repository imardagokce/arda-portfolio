import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isDev = process.env.NODE_ENV === 'development';

// Content-Security-Policy: sayfanın hangi kaynaklardan içerik yükleyebileceğini sınırlar.
// - Sayfalar build sırasında statik üretildiği için nonce kullanılamaz; Next.js'in ve tema
//   bileşeninin satır içi betikleri için script-src'de 'unsafe-inline' gerekir. Yine de dış
//   kaynaklar yalnızca bu listedekilerle sınırlıdır.
// - challenges.cloudflare.com: iletişim formundaki Cloudflare Turnstile (betik ve iframe).
// - img-src https:: GitHub README'lerindeki rozet ve görseller farklı alan adlarından gelir.
// - Vercel Web Analytics aynı alan adından (/_vercel/insights) çalıştığı için 'self' yeterlidir.
// - Geliştirme sunucusu (next dev) eval ve WebSocket (HMR) kullanır; yalnızca orada izin verilir.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' https:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  'frame-src https://challenges.cloudflare.com',
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
