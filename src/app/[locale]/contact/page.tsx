"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="relative group">
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder=" "
              className="peer w-full bg-muted/10 border border-border/40 rounded-xl px-4 pt-6 pb-2 text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 hover:bg-muted/20 transition-all shadow-sm"
            />
            <label 
              htmlFor="name" 
              className="absolute left-4 top-2 text-xs font-medium text-muted-foreground transition-all duration-200 pointer-events-none
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal
                         peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-accent"
            >
              {t('nameLabel')}
            </label>
          </div>

          <div className="relative group">
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder=" "
              className="peer w-full bg-muted/10 border border-border/40 rounded-xl px-4 pt-6 pb-2 text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 hover:bg-muted/20 transition-all shadow-sm"
            />
            <label 
              htmlFor="email" 
              className="absolute left-4 top-2 text-xs font-medium text-muted-foreground transition-all duration-200 pointer-events-none
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal
                         peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-accent"
            >
              {t('emailLabel')}
            </label>
          </div>

          <div className="relative group">
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              required 
              placeholder=" "
              className="peer w-full bg-muted/10 border border-border/40 rounded-xl px-4 pt-6 pb-2 text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 hover:bg-muted/20 transition-all shadow-sm"
            />
            <label 
              htmlFor="subject" 
              className="absolute left-4 top-2 text-xs font-medium text-muted-foreground transition-all duration-200 pointer-events-none
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal
                         peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-accent"
            >
              {t('subjectLabel')}
            </label>
          </div>

          <div className="relative group">
            <textarea 
              id="message" 
              name="message" 
              required 
              rows={5}
              placeholder=" "
              className="peer w-full bg-muted/10 border border-border/40 rounded-xl px-4 pt-6 pb-2 text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 hover:bg-muted/20 transition-all shadow-sm resize-none"
            />
            <label 
              htmlFor="message" 
              className="absolute left-4 top-2 text-xs font-medium text-muted-foreground transition-all duration-200 pointer-events-none
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal
                         peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-accent"
            >
              {t('messageLabel')}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex-1">
              {status === 'success' && (
                <p className="text-green-600 dark:text-green-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                  {t('successMessage')}
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                  {t('errorMessage')}
                </p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {t('submitBtn')}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </ScrollReveal>
    </div>
  );
}
