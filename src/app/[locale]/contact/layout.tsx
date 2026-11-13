import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// İletişim sayfası bir Client Component olduğu için generateMetadata export edemez;
// bu yüzden sayfanın metadata'sı bu segment layout'unda tanımlanır.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const t = await getTranslations({ locale, namespace: 'Contact' });

  return {
    title: tNav('contact'),
    description: t('subtitle'),
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
