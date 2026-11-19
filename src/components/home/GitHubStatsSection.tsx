import { getTranslations } from 'next-intl/server';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ScrollReveal } from '@/components/ScrollReveal';
import { GITHUB_USERNAME, type GitHubStats } from '@/lib/github';

export async function GitHubStatsSection({ locale, githubStats }: { locale: string; githubStats: GitHubStats }) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-border">
      <ScrollReveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('githubStatsTitle')}</h2>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-link text-foreground shrink-0 whitespace-nowrap"
          >
            @{GITHUB_USERNAME}
          </a>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <div className="font-display text-4xl text-foreground">
              <AnimatedCounter value={githubStats.totalRepos} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">{t('statRepos')}</div>
          </div>

          <div>
            <div className="font-display text-4xl text-foreground">
              <AnimatedCounter value={githubStats.totalStars} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">{t('statStars')}</div>
          </div>

          <div>
            <div className="font-display text-4xl text-foreground">
              <AnimatedCounter value={githubStats.followers} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">{t('statFollowers')}</div>
          </div>

          <div>
            {githubStats.lastUpdatedRepo ? (
              <>
                <div
                  className="font-display text-2xl text-foreground mt-2 truncate max-w-[12rem]"
                  title={githubStats.lastUpdatedRepo.name}
                >
                  {githubStats.lastUpdatedRepo.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {t('statLast')} {new Date(githubStats.lastUpdatedRepo.updatedAt).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </>
            ) : (
              <>
                <div className="font-display text-4xl text-foreground">-</div>
                <div className="text-sm text-muted-foreground mt-1">{t('statActivity')}</div>
              </>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
