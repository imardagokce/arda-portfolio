'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground';

export function Footer() {
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  const tFooter = useTranslations('Footer');
  const tPrivacy = useTranslations('Privacy');
  const tLegal = useTranslations('Legal');
  const pathname = usePathname();
  const onProjectsPage = pathname === '/projects' || pathname.startsWith('/projects/');

  return (
    <footer className="w-full py-16 mt-auto bg-background border-t border-border">
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-16 md:mb-24">
          {tFooter('openSourceTitle')} {tFooter('openSourceDesc')}{' '}
          <a
            href="https://github.com/imardagokce/arda-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className={`ink-link text-foreground ${FOCUS_RING}`}
          >
            {tFooter('viewRepo')}
          </a>
          {!onProjectsPage && (
            <>
              {' '}
              <Link href="/projects" className={`ink-link text-foreground ml-3 ${FOCUS_RING}`}>
                {tFooter('viewProjects')}
              </Link>
            </>
          )}
        </p>

        <p className="font-serif italic text-xl md:text-2xl text-foreground mb-8">
          {tCommon('quote')}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-muted-foreground mb-8">
          <Link href="/about" className={`hover:text-foreground transition-colors ${FOCUS_RING}`}>{t('about')}</Link>
          <Link href="/projects" className={`hover:text-foreground transition-colors ${FOCUS_RING}`}>{t('projects')}</Link>
          <Link href="/links" className={`hover:text-foreground transition-colors ${FOCUS_RING}`}>{t('links')}</Link>
          <Link href="/contact" className={`hover:text-foreground transition-colors ${FOCUS_RING}`}>{t('contact')}</Link>
          <Link href="/privacy" className={`hover:text-foreground transition-colors ${FOCUS_RING}`}>{tPrivacy('footerLink')}</Link>
          <Link href="/legal" className={`hover:text-foreground transition-colors ${FOCUS_RING}`}>{tLegal('footerLink')}</Link>
        </div>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Arda.
        </div>
      </div>
    </footer>
  );
}
