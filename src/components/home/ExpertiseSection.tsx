import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { ExpertiseOrbit } from './ExpertiseOrbit';

export async function ExpertiseSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  const items = [1, 2, 3, 4].map((n) => ({
    title: t(`expertise${n}Title` as 'expertise1Title'),
    desc: t(`expertise${n}Desc` as 'expertise1Desc'),
  }));

  const centre = (
    <>
      <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('expertiseTitle')}</h2>
      <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{t('expertiseDesc')}</p>
      <Link href="/about" className="inline-block mt-6 ink-link text-foreground">
        {t('expertiseLink')}
      </Link>
    </>
  );

  return (
    <section className="w-full px-6 py-24 md:py-32">
      <ScrollReveal>
        <ExpertiseOrbit
          centre={centre}
          items={items}
          prevLabel={t('orbitPrev')}
          nextLabel={t('orbitNext')}
          positionTemplate={t('orbitPosition', { current: '{current}', total: '{total}' })}
          groupLabel={t('orbitLabel')}
        />
      </ScrollReveal>
    </section>
  );
}
