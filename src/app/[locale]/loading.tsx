'use client';

import { useTranslations } from 'next-intl';

export default function LoadingPage() {
  const t = useTranslations('Loading');

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full px-6">
      <span className="text-sm font-medium text-muted-foreground animate-pulse tracking-wide">
        {t('text')}
      </span>
    </div>
  );
}
