import { ArrowRight, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] w-full">
      <ScrollReveal className="z-10 flex flex-col items-center justify-center text-center max-w-3xl px-6 gap-8">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            {t('greeting')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-6">
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all shadow-sm"
          >
            {t('projectsBtn')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/contact" 
            className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-full font-medium hover:bg-muted/80 border border-border/50 hover:border-accent/50 transition-all"
          >
            <Mail className="w-4 h-4" />
            {t('contactBtn')}
          </Link>
        </div>
      </ScrollReveal>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse opacity-40">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-foreground to-transparent" />
      </div>
    </section>
  );
}
