import { getAllProjects } from '@/lib/content';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const projects = getAllProjects(locale);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ScrollReveal key={project.slug} delay={index * 0.1}>
            <Link 
              href={`/projects/${project.slug}`}
              className="group block p-6 bg-background border border-border/50 rounded-2xl hover:-translate-y-1 hover:shadow-sm hover:border-accent/50 transition-all duration-300 h-full"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.frontmatter.title}
                    </h2>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      project.frontmatter.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                      project.frontmatter.status === 'completed' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {project.frontmatter.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {project.frontmatter.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.frontmatter.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-md border border-border/50">
                      {tech}
                    </span>
                  ))}
                  {project.frontmatter.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-md border border-border/50">
                      +{project.frontmatter.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
