'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] w-full px-6 py-12 text-center">
      <div className="business-card mx-auto w-full max-w-[560px] flex flex-col items-center justify-center px-8 text-center">
        <h1 className="font-display smallcaps letterpress text-5xl text-foreground">
          {t('title')}
        </h1>
        <h2 className="smallcaps text-xs text-muted-foreground mt-2">
          {t('subtitle')}
        </h2>
      </div>

      <div className="mt-10 text-center max-w-md mx-auto">
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
          {t('description')}
        </p>
        <Link
          href="/"
          className="ink-link text-foreground mt-6 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
