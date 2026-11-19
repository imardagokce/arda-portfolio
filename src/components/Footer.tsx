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

        <div className="flex flex-col items-center text-center gap-3 max-w-xl mx-auto mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
            aria-hidden="true"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <p className="font-display text-xl text-foreground">
            {tFooter('openSourceTitle')}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tFooter('openSourceDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href="https://github.com/imardagokce/arda-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className={`ink-link text-foreground ${FOCUS_RING}`}
            >
              {tFooter('viewRepo')}
            </a>
            {!onProjectsPage && (
              <Link href="/projects" className={`ink-link text-foreground ${FOCUS_RING}`}>
                {tFooter('viewProjects')}
              </Link>
            )}
          </div>
        </div>

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
