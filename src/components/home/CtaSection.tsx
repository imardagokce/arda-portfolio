import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export async function CtaSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="w-full max-w-2xl mx-auto px-6 pt-32 pb-16 md:pt-48 md:pb-20 text-center border-t border-border">
      <ScrollReveal>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">
            {t('ctaTitle')}
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('ctaDesc')}
          </p>
          <Link
            href="/contact"
            className="inline-block mt-10 bg-foreground text-background px-6 py-3 font-medium hover:bg-foreground/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            {t('ctaBtn')}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
