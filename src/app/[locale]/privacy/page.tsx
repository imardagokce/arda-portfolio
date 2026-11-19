import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return {
    title: t('title'),
    description: t('intro'),
  };
}

const sectionClass = 'mt-16 pt-16 border-t border-border';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

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
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('controllerTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('controllerDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('contactTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('contactDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('logsTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('logsDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('cookiesTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('cookiesDesc')}</p>
        <ul className="mt-8 divide-y divide-border">
          <li className="py-4 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('cookie1')}</li>
          <li className="py-4 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('cookie2')}</li>
          <li className="py-4 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('cookie3')}</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('thirdTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('thirdDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('rightsTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('rightsDesc')}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('changesTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('changesDesc')}</p>
      </section>
    </article>
  );
}
