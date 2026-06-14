import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('subtitle')}
          </p>
        </header>
      </ScrollReveal>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold space-y-12">
        <ScrollReveal delay={0.1}>
          <section>
            <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('whoAmITitle')}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('whoAmIDesc')}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <section>
            <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('interestsTitle')}</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 text-lg">
              <li>{t('interest1')}</li>
              <li>{t('interest2')}</li>
              <li>{t('interest3')}</li>
              <li>{t('interest4')}</li>
              <li>{t('interest5')}</li>
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <section>
            <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('philosophyTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('philosophyDesc')}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <section>
            <h2 className="text-2xl font-bold text-foreground border-b border-border/50 pb-4 mb-6">{t('currentWorkTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('currentWorkDesc')}
            </p>
          </section>
        </ScrollReveal>
      </div>
    </article>
  );
}
