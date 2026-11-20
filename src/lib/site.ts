// Öncelik sırası: NEXT_PUBLIC_SITE_URL, yoksa Vercel production URL'i, yoksa localhost.
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'http://localhost:3000'
).replace(/\/+$/, '');
