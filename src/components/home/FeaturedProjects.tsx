import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { formatRepoName } from '@/lib/format';
import type { Repository } from '@/lib/github';
import { getStatusTopic } from '@/lib/project-status';

export async function FeaturedProjects({ locale, projects }: { locale: string; projects: Repository[] }) {
  if (projects.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'Home' });
  const tProjects = await getTranslations({ locale, namespace: 'Projects' });

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const status = getStatusTopic(project.topics);
          const name = formatRepoName(project.name);
          return (
            <ScrollReveal key={project.name} delay={index * 0.1}>
              <Link
                href={`/projects/${project.name}`}
                aria-label={name}
                className="business-card block text-foreground"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  <h2 lang="en" className="font-display smallcaps letterpress text-2xl sm:text-3xl font-medium break-words">
                    {name}
                  </h2>
                  <p lang="en" className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {project.language && (
                  <span lang="en" className="absolute left-5 top-4 smallcaps text-[10px] sm:text-xs text-muted-foreground">
                    {project.language}
                  </span>
                )}
                {status && (
                  <span className="absolute right-5 top-4 smallcaps text-[10px] sm:text-xs text-muted-foreground">
                    {tProjects(`status.${status}`)}
                  </span>
                )}
                <span className="absolute left-5 bottom-4 text-[10px] sm:text-xs text-muted-foreground" title="Stars">
                  ★ {project.stars}
                </span>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
