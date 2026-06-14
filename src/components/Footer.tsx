import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  
  return (
    <footer className="w-full border-t border-border/40 py-16 mt-auto bg-background/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        <p className="font-serif italic text-xl md:text-2xl text-foreground mb-8">
          {tCommon('quote')}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-muted-foreground mb-8">
          <Link href="/about" className="hover:text-accent transition-colors">{t('about')}</Link>
          <Link href="/projects" className="hover:text-accent transition-colors">{t('projects')}</Link>
          <Link href="/devlog" className="hover:text-accent transition-colors">{t('devlog')}</Link>
          <Link href="/links" className="hover:text-accent transition-colors">{t('links')}</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">{t('contact')}</Link>
        </div>
        
        <div className="text-sm text-muted-foreground/60">
          © {new Date().getFullYear()} Arda.
        </div>
      </div>
    </footer>
  );
}
