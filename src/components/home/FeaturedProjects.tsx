import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PlayingCard } from '@/components/PlayingCard';
import { Link } from '@/i18n/routing';
import { getRepositories, type Repository } from '@/lib/github';
import { hashTilt, rankLabel, sortByRank, suitForStatus } from '@/lib/deck';
import { getStatusTopic } from '@/lib/project-status';

export async function FeaturedProjects({ locale, projects }: { locale: string; projects: Repository[] }) {
  if (projects.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'Home' });
  const tProjects = await getTranslations({ locale, namespace: 'Projects' });

  // Rank is the position in the FULL list (same as the Projects page), so a card's rank matches there.
  const rankByName = new Map(
    sortByRank(await getRepositories()).map((repo, index) => [repo.name, rankLabel(index)])
  );

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-border/30">
      <ScrollReveal>
        <div className="flex items-center justify-between gap-4 mb-12">
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-foreground">{t('featuredProjectsTitle')}</h2>
          <Link href="/projects" className="ink-link text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0 whitespace-nowrap">
            {t('viewAll')}
          </Link>
        </div>
      </ScrollReveal>

      <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 list-none p-0">
        {projects.map((project, index) => {
          const status = getStatusTopic(project.topics);
          return (
            <li key={project.name} className="w-[calc(50%-0.75rem)] sm:w-[220px]">
              <ScrollReveal delay={index * 0.1}>
                <PlayingCard
                  repo={project}
                  rank={rankByName.get(project.name) ?? ''}
                  suit={suitForStatus(status)}
                  statusLabel={status ? tProjects(`status.${status}`) : tProjects('suitOther')}
                  noDescription={tProjects('noDescription')}
                  tilt={hashTilt(project.name)}
                />
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
