import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

// Lucide React resmi brand ikonları kütüphaneden kaldırıldığı için, 
// resmi SVG path'lerini tasarım sistemiyle (currentColor) tam uyumlu şekilde inline olarak kullanıyoruz.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default async function LinksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Links' });

  const links = [
    { 
      name: "GitHub", 
      url: "https://github.com/imardagokce", 
      icon: GithubIcon, 
      desc: t('githubDesc') 
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com/in/imardagokce", 
      icon: LinkedinIcon, 
      desc: t('linkedinDesc') 
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>
      
      <div className="flex flex-col gap-5 max-w-xl mx-auto">
        {links.map((link, index) => (
          <ScrollReveal key={link.name} delay={index * 0.1}>
            <a 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-5 sm:p-6 bg-background border border-border/50 rounded-2xl hover:bg-muted/30 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-colors shrink-0 mr-6">
                <link.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                  {link.name}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {link.desc}
                </p>
              </div>
              <div className="pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
