import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export async function CtaSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="w-full max-w-2xl mx-auto px-6 pt-32 pb-16 md:pt-48 md:pb-20 text-center border-t border-border/30">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {t('ctaTitle')}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          {t('ctaDesc')}
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 hover:-translate-y-1 transition-all shadow-sm text-lg"
        >
          <Mail className="w-5 h-5" />
          {t('ctaBtn')}
        </Link>
      </ScrollReveal>
    </section>
  );
}
