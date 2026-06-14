"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTheme } from 'next-themes';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

export function NavBar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) setScrolled(true);
    else setScrolled(false);
  });

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}
    >
      <nav className={`flex items-center justify-between w-full max-w-4xl px-6 py-3 transition-all duration-300 backdrop-blur-xl bg-background/60 border border-border/40 rounded-2xl ${scrolled ? 'shadow-sm shadow-black/5 dark:shadow-white/5' : ''}`}>
         <div className="flex items-center gap-8">
           <Link href="/" className="font-semibold text-lg text-foreground hover:text-accent transition-colors tracking-tight">A.</Link>
           <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-muted-foreground">
             <Link href="/about" className={`transition-colors ${pathname.startsWith('/about') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('about')}</Link>
             <Link href="/projects" className={`transition-colors ${pathname.startsWith('/projects') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('projects')}</Link>
             <Link href="/devlog" className={`transition-colors ${pathname.startsWith('/devlog') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('devlog')}</Link>
             <Link href="/links" className={`transition-colors ${pathname.startsWith('/links') ? 'text-foreground' : 'hover:text-foreground'}`}>{t('links')}</Link>
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
         </div>
      </nav>
    </motion.header>
  );
}
