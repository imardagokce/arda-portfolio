import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  const tFooter = useTranslations('Footer');
  
  return (
    <footer className="w-full border-t border-border/40 py-16 mt-auto bg-background/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-muted/30 border border-border/50 rounded-2xl w-full max-w-2xl mb-12">
           <GithubIcon className="w-8 h-8 text-muted-foreground mb-4 opacity-80" />
           <p className="text-foreground font-semibold mb-2">{tFooter('openSourceTitle')}</p>
           <p className="text-sm text-muted-foreground mb-6 max-w-md">{tFooter('openSourceDesc')}</p>
           
           <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href="https://github.com/imardagokce/arda-portfolio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-background border border-border/60 hover:border-accent/40 rounded-full text-sm font-medium text-foreground hover:text-accent transition-colors shadow-sm"
              >
                {tFooter('viewRepo')}
              </a>
              <Link 
                href="/projects" 
                className="px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm font-medium transition-colors shadow-sm"
              >
                {tFooter('viewProjects')}
              </Link>
           </div>
        </div>

        <p className="font-serif italic text-xl md:text-2xl text-foreground mb-8">
          {tCommon('quote')}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-muted-foreground mb-8">
          <Link href="/about" className="hover:text-accent transition-colors">{t('about')}</Link>
          <Link href="/projects" className="hover:text-accent transition-colors">{t('projects')}</Link>
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
