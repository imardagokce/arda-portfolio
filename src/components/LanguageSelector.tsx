"use client";

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe, Check } from 'lucide-react';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' }
  ];

  // Dışarı tıklama kontrolü
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Escape tuşu kontrolü
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    // next-intl middleware'in hatırlayabilmesi için NEXT_LOCALE cookie'sini açıkça ayarlıyoruz.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm hidden sm:block">
          {locale}
        </span>
      </button>

      {/* Her zaman DOM'da; kapalıyken görünmez ve odaklanılamaz (visibility: hidden). */}
      <div
        className={`absolute right-0 mt-2 w-40 bg-background border border-border z-50 origin-top-right transition-[opacity,transform,visibility] duration-150 ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 ${isOpen ? 'visible opacity-100 translate-y-0 scale-100' : 'invisible opacity-0 translate-y-2.5 scale-95 pointer-events-none'}`}
      >
        <div className="py-1 flex flex-col">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-left hover:text-foreground transition-colors w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground"
              role="menuitem"
            >
              <span className={locale === lang.code ? 'text-foreground' : 'text-muted-foreground'}>
                {lang.label}
              </span>
              {locale === lang.code && (
                <Check className="w-4 h-4 text-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
