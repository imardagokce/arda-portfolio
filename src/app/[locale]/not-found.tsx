'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] w-full px-6 text-center">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-foreground">
          {t('title')}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          {t('subtitle')}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
