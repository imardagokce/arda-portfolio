import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal' });

  return {
    title: t('title'),
    description: t('intro'),
  };
}

const sectionClass = 'mt-16 pt-16 border-t border-border';

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal' });

  return (
    <article className="w-full max-w-2xl mx-auto px-6 py-12 md:py-24">
      <header className="mb-16">
        <h1 className="font-display font-medium text-4xl sm:text-5xl letterpress text-foreground">
          {t('title')}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {t('updated')}
        </p>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
          {t('intro')}
        </p>
      </header>

      <section>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('contentTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('contentDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('adviceTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('adviceDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('linksTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('linksDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('copyrightTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('copyrightDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('liabilityTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('liabilityDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('changesTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('changesDesc')}</p>
      </section>
    </article>
  );
}
