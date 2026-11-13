import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// Sosyal medya paylaşımlarında görünen görsel (og:image / twitter:image), dile göre üretilir.
// Tasarım sitenin koyu temasını kullanır: lacivert zemin, altın tonlu yazı ve imza işareti.
// Önemli içerik tuvalin orta %80'inde tutulur; platformlar kenarları kırpsa bile okunur kalır.
export const alt = 'Arda | Digital Workspace';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// globals.css'teki koyu tema token'larıyla aynı değerler.
const colors = {
  background: '#0B1020',
  glow: '#18213C',
  border: '#1F2942',
  heading: '#E7D7A5',
  foreground: '#DCCB92',
  muted: '#B3A573',
};

// NavBar'daki imza işareti ile aynı çizim.
function SignatureMark({ size: markSize, opacity = 1 }: { size: number; opacity?: number }) {
  return (
    <svg
      width={markSize}
      height={markSize}
      viewBox="0 0 200 200"
      fill="none"
      stroke={colors.heading}
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity }}
    >
      <path d="M 55,145 C 60,145 80,80 100,40 C 98,90 102,130 115,150 C 118,154 122,150 120,145" />
      <path d="M 45,115 C 80,105 120,98 155,93" />
      <circle cx="155" cy="93" r="10" fill={colors.heading} stroke="none" />
    </svg>
  );
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
  const tHome = await getTranslations({ locale, namespace: 'Home' });
  const focusAreas = [
    tHome('expertise1Title'),
    tHome('expertise2Title'),
    tHome('expertise3Title'),
    tHome('expertise4Title'),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: colors.background,
          backgroundImage: `radial-gradient(circle at 82% 28%, ${colors.glow} 0%, ${colors.background} 58%)`,
          color: colors.foreground,
        }}
      >
        {/* İnce çerçeve: sitedeki kart kenarlıklarının karşılığı */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            display: 'flex',
            border: `1px solid ${colors.border}`,
            borderRadius: 28,
          }}
        />

        {/* Sağda büyük, soluk imza: sitenin açılış animasyonuna gönderme (dekoratif) */}
        <div style={{ position: 'absolute', top: 70, right: 60, display: 'flex' }}>
          <SignatureMark size={500} opacity={0.09} />
        </div>

        {/* İçerik: yatayda 120px, dikeyde 76px iç boşluk = güvenli alan */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '76px 120px',
          }}
        >
          <SignatureMark size={72} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 150, lineHeight: 1, letterSpacing: -5, color: colors.heading }}>Arda</div>
            <div style={{ marginTop: 18, fontSize: 46, lineHeight: 1.2, color: colors.foreground }}>
              {tMeta('tagline')}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: 96, height: 3, backgroundColor: colors.muted }} />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 26, fontSize: 27, color: colors.muted }}>
              {focusAreas.map((area, index) => (
                <div key={area} style={{ display: 'flex', alignItems: 'center' }}>
                  {index > 0 && <div style={{ margin: '0 18px', color: colors.border }}>•</div>}
                  <div>{area}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
