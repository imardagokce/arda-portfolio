import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const t = await getTranslations({ locale, namespace: 'About' });

  return {
    title: tNav('about'),
    description: t('subtitle'),
  };
}

// Interest translations are "Title - description"; split on the first " - ".
function splitInterest(value: string) {
  const separator = value.indexOf(' - ');
  if (separator === -1) return { title: value, description: '' };
  return { title: value.slice(0, separator), description: value.slice(separator + 3) };
}

const sectionClass = 'mt-16 pt-16 border-t border-border';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  const interests = [
    t('interest1'),
    t('interest2'),
    t('interest3'),
    t('interest4'),
    t('interest5'),
  ].map(splitInterest);

  return (
    <article className="w-full max-w-2xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <header className="mb-16">
          <h1 className="font-display font-medium text-4xl sm:text-5xl letterpress text-foreground">
            {t('title')}
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('whoAmITitle')}</h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('whoAmIDesc')}
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <section className={sectionClass}>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('interestsTitle')}</h2>
          <ul className="mt-8 space-y-8">
            {interests.map((interest, index) => (
              <li key={index}>
                <h3 className="font-display text-xl text-foreground">{interest.title}</h3>
                {interest.description && (
                  <p className="mt-2 text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {interest.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <section className={sectionClass}>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('philosophyTitle')}</h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('philosophyDesc')}
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <section className={sectionClass}>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('currentWorkTitle')}</h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('currentWorkDesc')}
          </p>
        </section>
      </ScrollReveal>
    </article>
  );
}
