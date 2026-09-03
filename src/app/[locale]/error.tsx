'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] w-full px-6 text-center">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
        <div className="pt-8">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            {t('tryAgain')}
          </button>
        </div>
      </div>
    </div>
  );
}
