"use client";

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CONTACT_LIMITS } from '@/lib/contact-limits';
import { Link } from '@/i18n/routing';

const fieldClass =
  'w-full bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none focus-visible:ring-0 px-0 py-3 text-foreground';

const labelClass = 'block text-sm text-muted-foreground mb-1';

const statusClass = 'border border-border p-4 text-sm text-foreground animate-in fade-in slide-in-from-bottom-2';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const tPrivacy = useTranslations('Privacy');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rateLimited'>('idle');
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const consentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Açık rıza işaretlenmeden gönderim yapılmaz; kullanıcı onay kutusuna yönlendirilir.
    if (!consentChecked) {
      setConsentError(true);
      consentRef.current?.focus();
      return;
    }
    setConsentError(false);
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Sonsuz spinner riskine karşı güvenli fallback timeout (15 saniye)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consent: true }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // 429: sunucudaki rate limit'e takıldı; genel hata yerine ne yapılacağını söyleyen ayrı bir mesaj gösterilir.
      if (res.status === 429) {
        setStatus('rateLimited');
        return;
      }

      if (!res.ok) throw new Error('Failed to send message');

      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setConsentChecked(false);
    } catch {
      clearTimeout(timeoutId);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <div className="mb-16">
          <h1 className="font-display font-medium text-4xl sm:text-5xl letterpress text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <form onSubmit={handleSubmit} className="space-y-8">

          <div>
            <label htmlFor="name" className={labelClass}>
              {t('nameLabel')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength={CONTACT_LIMITS.name}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              {t('emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength={CONTACT_LIMITS.email}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="subject" className={labelClass}>
              {t('subjectLabel')}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              maxLength={CONTACT_LIMITS.subject}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              {t('messageLabel')}
            </label>
            <textarea
              id="message"
              name="message"
              maxLength={CONTACT_LIMITS.message}
              required
              rows={5}
              className={`${fieldClass} min-h-40 resize-none`}
            />
          </div>

          <div className="flex flex-col gap-6 pt-2">
            {status === 'success' && (
              <p className={statusClass}>
                {t('successMessage')}
              </p>
            )}
            {status === 'error' && (
              <p className={statusClass}>
                {t('errorMessage')}
              </p>
            )}
            {status === 'rateLimited' && (
              <p className={statusClass}>
                {t('rateLimitMessage')}
              </p>
            )}

            <div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  ref={consentRef}
                  type="checkbox"
                  id="consent"
                  checked={consentChecked}
                  onChange={(e) => {
                    setConsentChecked(e.target.checked);
                    if (e.target.checked) setConsentError(false);
                  }}
                  aria-invalid={consentError || undefined}
                  aria-describedby={consentError ? 'consent-error' : undefined}
                  className="mt-1 h-4 w-4 accent-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                />
                <label htmlFor="consent" className="cursor-pointer leading-relaxed">
                  {tPrivacy('consentLabel')}
                </label>
              </div>
              {consentError && (
                <p id="consent-error" className="mt-2 pl-7 text-sm text-foreground">
                  {tPrivacy('consentRequired')}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-foreground text-background px-6 py-3 font-medium hover:bg-foreground/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                t('submitBtn')
              )}
            </button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {tPrivacy.rich('formNotice', {
              link: (chunks) => (
                <Link href="/privacy" className="ink-link text-foreground">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </form>
      </ScrollReveal>
    </div>
  );
}
