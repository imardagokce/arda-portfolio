import { getProjectBySlug, getAllDevLogs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Code2, ExternalLink, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getRepositoryData } from '@/lib/github';
import { getTranslations } from 'next-intl/server';

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: 'Projects' });
  
  if (!project) {
    notFound();
  }

  // Get associated dev logs
  const allLogs = getAllDevLogs(locale);
  const associatedLogs = allLogs.filter(log => log.frontmatter.project === project.frontmatter.title);

  // Get GitHub repo data if available
  let repoData = null;
  if (project.frontmatter.github) {
    const parts = project.frontmatter.github.split('/');
    const repoName = parts[parts.length - 1];
    repoData = await getRepositoryData(repoName);
  }

  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          {t('backBtn')}
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            {project.frontmatter.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {repoData?.description || project.frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            {project.frontmatter.github && (
              <a href={project.frontmatter.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-muted/50 rounded-full hover:bg-muted transition-colors border border-border/50">
                <Code2 className="w-4 h-4" />
                {t('sourceCode')}
                {repoData && (
                  <span className="flex items-center gap-1 ml-2 pl-2 border-l border-border text-accent">
                    <Star className="w-3 h-3" /> {repoData.stars}
                  </span>
                )}
              </a>
            )}
            {project.frontmatter.demo && (
              <a href={project.frontmatter.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors">
                <ExternalLink className="w-4 h-4" />
                {t('liveDemo')}
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.frontmatter.technologies.map(tech => (
              <span key={tech} className="text-sm px-3 py-1 bg-background border border-border/50 text-muted-foreground rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80">
          <MDXRemote source={project.content} />
        </div>
      </ScrollReveal>

      {/* Associated Dev Logs */}
      {associatedLogs.length > 0 && (
        <section className="mt-24 pt-12 border-t border-border/50">
          <h3 className="text-2xl font-bold mb-8">{t('associatedLogs')}</h3>
          <div className="space-y-6">
            {associatedLogs.map(log => (
              <Link 
                key={log.slug}
                href={`/devlog/${log.slug}`}
                className="block p-6 rounded-2xl border border-border/30 hover:border-border/80 hover:bg-muted/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">{log.frontmatter.title}</h4>
                  <time className="text-sm text-muted-foreground">
                    {new Date(log.frontmatter.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </div>
                <p className="text-muted-foreground">{log.frontmatter.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
