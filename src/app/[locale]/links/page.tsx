import { getTranslations } from 'next-intl/server';
import { ArrowRight, ChevronDown } from 'lucide-react';
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

function UnityIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z"/>
    </svg>
  );
}

function ItchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-3.253-.114-5.508-.134-8.87-.133-3.362 0-7.945.053-8.87.133zm6.376 6.477a2.74 2.74 0 0 1-.468.602c-.5.49-1.19.795-1.947.795a2.786 2.786 0 0 1-1.95-.795c-.182-.178-.32-.37-.446-.59-.127.222-.303.412-.486.59a2.788 2.788 0 0 1-1.95.795c-.092 0-.187-.025-.264-.052-.107 1.113-.152 2.176-.168 2.95v.005l-.006 1.167c.02 2.334-.23 7.564 1.03 8.85 1.952.454 5.545.662 9.15.663 3.605 0 7.198-.21 9.15-.664 1.26-1.284 1.01-6.514 1.03-8.848l-.006-1.167v-.004c-.016-.775-.06-1.838-.168-2.95-.077.026-.172.052-.263.052a2.788 2.788 0 0 1-1.95-.795c-.184-.178-.36-.368-.486-.59-.127.22-.265.412-.447.59a2.786 2.786 0 0 1-1.95.794c-.76 0-1.446-.303-1.948-.793a2.74 2.74 0 0 1-.468-.602 2.738 2.738 0 0 1-.463.602 2.787 2.787 0 0 1-1.95.794h-.16a2.787 2.787 0 0 1-1.95-.793 2.738 2.738 0 0 1-.464-.602zm-2.004 2.59v.002c.795.002 1.5 0 2.373.953.687-.072 1.406-.108 2.125-.107.72 0 1.438.035 2.125.107.873-.953 1.578-.95 2.372-.953.376 0 1.876 0 2.92 2.934l1.123 4.028c.832 2.995-.266 3.068-1.636 3.07-2.03-.075-3.156-1.55-3.156-3.025-1.124.184-2.436.276-3.748.277-1.312 0-2.624-.093-3.748-.277 0 1.475-1.125 2.95-3.156 3.026-1.37-.004-2.468-.077-1.636-3.072l1.122-4.027c1.045-2.934 2.545-2.934 2.92-2.934zM12 12.714c-.002.002-2.14 1.964-2.523 2.662l1.4-.056v1.22c0 .056.56.033 1.123.007.562.026 1.124.05 1.124-.008v-1.22l1.4.055C14.138 14.677 12 12.713 12 12.713z"/>
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
      url: "#", 
      icon: LinkedinIcon, 
      desc: t('linkedinDesc'),
      disabled: true,
      unavailableMessage: t('linkedinUnavailable')
    },
    {
      name: "Unity Learn",
      icon: UnityIcon,
      desc: t('unityDesc'),
      collapsible: true,
      stats: {
        pathway: "Unity Essentials",
        progress: "28%",
        xp: "690",
        completed: "9",
        badges: "1"
      },
      unavailableMessage: t('unityNoProfile')
    },
    {
      name: "itch.io",
      url: "#",
      icon: ItchIcon,
      desc: t('itchDesc'),
      disabled: true,
      unavailableMessage: t('itchUnavailable')
    }
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
            {link.collapsible ? (
              <details className="group bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-all duration-300 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center p-5 sm:p-6 cursor-pointer outline-none hover:bg-muted/30 transition-colors list-none">
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
                  <div className="pl-4">
                     <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-accent group-open:rotate-180 transition-transform duration-300" />
                  </div>
                </summary>
                
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-border/30 bg-muted/10">
                  <div className="mb-5 mt-2">
                    <p className="text-sm font-medium text-foreground mb-2">{t('unityPathway')}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground font-medium">{link.stats?.pathway}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent/80 rounded-full" style={{ width: link.stats?.progress }} />
                      </div>
                      <span className="text-xs font-semibold text-accent">{link.stats?.progress}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="bg-background border border-border/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">XP</p>
                      <p className="text-xl font-bold text-foreground">{link.stats?.xp}</p>
                    </div>
                    <div className="bg-background border border-border/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">{t('unityCompleted')}</p>
                      <p className="text-xl font-bold text-foreground">{link.stats?.completed}</p>
                    </div>
                    <div className="bg-background border border-border/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">{t('unityBadges')}</p>
                      <p className="text-xl font-bold text-foreground">{link.stats?.badges}</p>
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-muted-foreground/70 font-medium text-center">
                    {link.unavailableMessage}
                  </p>
                </div>
              </details>
            ) : link.disabled ? (
              <div className="group flex items-center p-5 sm:p-6 bg-background/50 border border-border/30 rounded-2xl opacity-70 cursor-default shadow-sm">
                <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground shrink-0 mr-6">
                  <link.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-xl font-semibold text-foreground/80 mb-1">
                    {link.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {link.desc}
                  </p>
                  <p className="text-[13px] text-muted-foreground/80 mt-2 font-medium">
                    {link.unavailableMessage}
                  </p>
                </div>
              </div>
            ) : (
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
            )}
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
