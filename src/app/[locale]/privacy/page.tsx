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

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-12 md:py-24">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {t('updated')}
        </p>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t('intro')}
        </p>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('controllerTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t('controllerDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('contactTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t('contactDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('logsTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t('logsDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('cookiesTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t('cookiesDesc')}</p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-2 text-lg mt-4">
            <li>{t('cookie1')}</li>
            <li>{t('cookie2')}</li>
            <li>{t('cookie3')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('thirdTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t('thirdDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('rightsTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t('rightsDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('changesTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t('changesDesc')}</p>
        </section>
      </div>
    </article>
  );
}
