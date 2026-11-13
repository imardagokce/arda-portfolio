import { ArrowRight, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import type { Repository } from '@/lib/github';

export async function FeaturedProjects({ locale, projects }: { locale: string; projects: Repository[] }) {
  if (projects.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'Home' });
  const tProjects = await getTranslations({ locale, namespace: 'Projects' });

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-border/30">
      <ScrollReveal>
        <div className="flex items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground">{t('featuredProjectsTitle')}</h2>
          <Link href="/projects" className="shrink-0 whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
            {t('viewAll')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const status = project.topics?.find(t => ['active', 'nearly-finished', 'completed', 'idea', 'planned', 'paused', 'archived'].includes(t)) || null;
          return (
          <ScrollReveal key={project.name} delay={index * 0.1}>
             <Link 
                href={`/projects/${project.name}`}
                className="group block p-6 bg-background border border-border/50 rounded-2xl hover:-translate-y-1 hover:shadow-sm hover:border-accent/50 transition-all duration-300 h-full"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-4">
                      <h2 className="min-w-0 break-words text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {project.name}
                      </h2>
                      <div className="flex shrink-0 items-center gap-3">
                        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                          <Star className="w-3 h-3 text-accent" />
                          {project.stars}
                        </div>
                        {status && (
                          <span className="whitespace-nowrap text-xs px-2 py-1 rounded-full font-medium bg-muted text-muted-foreground">
                            {tProjects(`status.${status}`)}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.language && (
                      <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-md border border-border/50">
                        {project.language}
                      </span>
                    )}
                    {project.topics.slice(0, 2).map(tech => (
                      <span key={tech} className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-md border border-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
          </ScrollReveal>
        )})}
      </div>
    </section>
  );
}
