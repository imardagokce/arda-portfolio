import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export async function ExpertiseSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-24 md:py-32">
      <ScrollReveal>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('expertiseTitle')}</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {t('expertiseDesc')}
        </p>
        <Link href="/about" className="inline-block mt-6 ink-link text-foreground">
          {t('expertiseLink')}
        </Link>

        <dl className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <dt className="font-display text-2xl text-foreground">{t('expertise1Title')}</dt>
            <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{t('expertise1Desc')}</dd>
          </div>
          <div>
            <dt className="font-display text-2xl text-foreground">{t('expertise2Title')}</dt>
            <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{t('expertise2Desc')}</dd>
          </div>
          <div>
            <dt className="font-display text-2xl text-foreground">{t('expertise3Title')}</dt>
            <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{t('expertise3Desc')}</dd>
          </div>
          <div>
            <dt className="font-display text-2xl text-foreground">{t('expertise4Title')}</dt>
            <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{t('expertise4Desc')}</dd>
          </div>
        </dl>
      </ScrollReveal>
    </section>
  );
}
