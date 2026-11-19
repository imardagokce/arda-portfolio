import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] w-full py-24 px-6">
      <ScrollReveal className="z-10 flex flex-col items-center justify-center text-center w-full">
        <div className="business-card mx-auto w-full max-w-[560px] text-foreground">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-display smallcaps letterpress text-3xl sm:text-4xl font-medium">
              Arda Gökçe Alkan
            </h1>
            <p className="smallcaps text-xs sm:text-sm text-muted-foreground mt-2">
              {t('cardRole')}
            </p>
          </div>

          <p className="smallcaps text-[10px] sm:text-xs absolute left-5 bottom-4 sm:left-7 sm:bottom-6">
            {t('cardFields')}
          </p>
          <p lang="en" className="smallcaps text-[10px] sm:text-xs absolute right-5 bottom-4 sm:right-7 sm:bottom-6">
            github.com/imardagokce
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto text-center">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex items-center justify-center gap-8 mt-8">
            <Link href="/projects" className="smallcaps ink-link text-sm text-foreground">
              {t('projectsBtn')}
            </Link>
            <Link href="/contact" className="smallcaps ink-link text-sm text-foreground">
              {t('contactBtn')}
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
