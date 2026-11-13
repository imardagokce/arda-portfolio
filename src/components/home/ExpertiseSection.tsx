import { ArrowRight, Code2, Globe, Server, Shield } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export async function ExpertiseSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32">
      <ScrollReveal>
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">{t('expertiseTitle')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t('expertiseDesc')}
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent/80 transition-colors mt-6">
            {t('expertiseLink')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <ScrollReveal delay={0.1}>
          <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <Server className="w-8 h-8 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise1Title')}</h3>
            <p className="text-muted-foreground">{t('expertise1Desc')}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <Globe className="w-8 h-8 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise2Title')}</h3>
            <p className="text-muted-foreground">{t('expertise2Desc')}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <Shield className="w-8 h-8 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise3Title')}</h3>
            <p className="text-muted-foreground">{t('expertise3Desc')}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <Code2 className="w-8 h-8 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise4Title')}</h3>
            <p className="text-muted-foreground">{t('expertise4Desc')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
