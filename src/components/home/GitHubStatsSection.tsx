import { Code2, ExternalLink, GitCommit, Star, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ScrollReveal } from '@/components/ScrollReveal';
import { GITHUB_USERNAME, type GitHubStats } from '@/lib/github';

export async function GitHubStatsSection({ locale, githubStats }: { locale: string; githubStats: GitHubStats }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-border/30">
      <ScrollReveal>
        <div className="flex items-center justify-between gap-4 mb-12">
           <h2 className="text-3xl font-bold text-foreground">{t('githubStatsTitle')}</h2>
           <a 
             href={`https://github.com/${GITHUB_USERNAME}`}
             target="_blank" 
             rel="noopener noreferrer" 
             className="group shrink-0 whitespace-nowrap flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors px-4 py-2 bg-muted/30 rounded-full border border-border/50 hover:border-accent/30"
           >
              @{GITHUB_USERNAME} <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <Code2 className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
            <span className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-2">
              <AnimatedCounter value={githubStats.totalRepos} />
            </span>
            <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statRepos')}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <Star className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
            <span className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-2">
              <AnimatedCounter value={githubStats.totalStars} />
            </span>
            <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statStars')}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <Users className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
            <span className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-2">
              <AnimatedCounter value={githubStats.followers} />
            </span>
            <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statFollowers')}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
            <GitCommit className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
            {githubStats.lastUpdatedRepo ? (
              <>
                <span className="text-sm md:text-base font-bold text-foreground mb-1 px-2 truncate w-full max-w-[140px]" title={githubStats.lastUpdatedRepo.name}>
                  {githubStats.lastUpdatedRepo.name}
                </span>
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground">
                  {t('statLast')} {new Date(githubStats.lastUpdatedRepo.updatedAt).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </>
            ) : (
              <>
                <span className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">-</span>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statActivity')}</span>
              </>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
