"use client";

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

// Mobil menüde gösterilen sayfalar (masaüstü linkleriyle aynı sıra, başında ana sayfa).
const MOBILE_NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/links', key: 'links' },
  { href: '/cv', key: 'cv' },
  { href: '/contact', key: 'contact' },
] as const;

export function NavBar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- next-themes hydration guard: mount'ta tek seferlik, bilinçli
  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) setScrolled(true);
    else setScrolled(false);
  });

  // Mobil menü: Escape ve dışarı dokunma ile kapanır; Escape'te odak menü düğmesine döner.
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}
    >
      <nav ref={navRef} className={`relative flex items-center justify-between w-full max-w-4xl px-6 py-3 transition-all duration-300 backdrop-blur-xl bg-background/60 border border-border/40 rounded-2xl ${scrolled ? 'shadow-sm shadow-black/5 dark:shadow-white/5' : ''}`}>
         <div className="flex items-center gap-8">
           <Link href="/" className="text-foreground hover:text-accent transition-colors flex items-center justify-center" aria-label="Home">
             <svg
               width="28"
               height="28"
               viewBox="0 0 200 200"
               fill="none"
               stroke="currentColor"
               strokeWidth="12"
               strokeLinecap="round"
               strokeLinejoin="round"
             >
               <path d="M 55,145 C 60,145 80,80 100,40 C 98,90 102,130 115,150 C 118,154 122,150 120,145" />
               <path d="M 45,115 C 80,105 120,98 155,93" />
               <circle cx="155" cy="93" r="12" className="fill-current stroke-none" />
             </svg>
           </Link>
           <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-muted-foreground">
             <Link href="/about" className={`transition-colors ${pathname.startsWith('/about') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('about')}</Link>
             <Link href="/projects" className={`transition-colors ${pathname.startsWith('/projects') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('projects')}</Link>
             <Link href="/links" className={`transition-colors ${pathname.startsWith('/links') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('links')}</Link>
             <Link href="/cv" className={`transition-colors ${pathname.startsWith('/cv') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('cv')}</Link>
             <Link href="/contact" className={`transition-colors ${pathname.startsWith('/contact') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('contact')}</Link>
           </div>
         </div>
         
         <div className="flex items-center gap-2 sm:gap-5">
           <LanguageSelector />
           
           <button 
             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
             className="p-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
             aria-label="Toggle Theme"
           >
             {mounted ? (
               theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
             ) : (
               <span className="block h-4 w-4" />
             )}
           </button>

           {/* Mobil menü düğmesi: görünüm diğer ikon düğmeleriyle aynı, dokunma alanı 44px'e genişletildi. */}
           <button
             ref={menuButtonRef}
             type="button"
             onClick={() => setMenuOpen((open) => !open)}
             className="md:hidden relative p-2 rounded-full hover:bg-muted/50 text-foreground hover:text-accent dark:text-muted-foreground dark:hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent after:absolute after:-inset-1.5 after:content-['']"
             aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
             aria-expanded={menuOpen}
             aria-controls="mobile-nav-menu"
           >
             {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
           </button>
         </div>

         <AnimatePresence>
           {menuOpen && (
             <motion.div
               id="mobile-nav-menu"
               initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
               animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }}
               exit={{ opacity: 0, y: reduceMotion ? 0 : -8, transition: { duration: 0.15, ease: "easeIn" } }}
               className="md:hidden absolute left-0 right-0 top-full mt-2 p-2 rounded-2xl bg-background border border-border/50 shadow-lg"
             >
               <ul className="flex flex-col gap-1">
                 {MOBILE_NAV_ITEMS.map((item) => {
                   const active = isActive(item.href);
                   return (
                     <li key={item.href}>
                       <Link
                         href={item.href}
                         onClick={() => setMenuOpen(false)}
                         aria-current={active ? 'page' : undefined}
                         className={`flex items-center min-h-11 px-4 rounded-xl text-base font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? 'bg-muted/50 text-accent dark:text-foreground' : 'text-foreground dark:text-muted-foreground hover:bg-muted/50 hover:text-accent dark:hover:text-foreground'}`}
                       >
                         {t(item.key)}
                       </Link>
                     </li>
                   );
                 })}
               </ul>
             </motion.div>
           )}
         </AnimatePresence>
      </nav>
    </motion.header>
  );
}
