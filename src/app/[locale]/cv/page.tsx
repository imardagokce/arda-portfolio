import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function CVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CV' });

  return (
    <article className="w-full max-w-2xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('desc')}
          </p>
        </header>
      </ScrollReveal>
    </article>
  );
}
