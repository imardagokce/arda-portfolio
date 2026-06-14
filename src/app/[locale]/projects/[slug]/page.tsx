import { getProjectBySlug, getAllDevLogs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Code2, ExternalLink, Star, Calendar, CircleDot } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getRepositoryData, getRepositoryReadme } from '@/lib/github';
import { getTranslations } from 'next-intl/server';

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  
  // 1. Fetch GitHub Data First
  const repoData = await getRepositoryData(slug);
  
  // If no repo found on GitHub, we don't display it (since it's GitHub-centric now)
  if (!repoData) {
    notFound();
  }

  const readme = await getRepositoryReadme(slug);

  // 2. Fetch manual MDX data if it exists (for future extensibility)
  const project = getProjectBySlug(locale, slug);

  // 3. Get associated dev logs
  const allLogs = getAllDevLogs(locale);
  const associatedLogs = allLogs.filter(log => 
    log.frontmatter.project === repoData.name || 
    (project && log.frontmatter.project === project.frontmatter.title)
  );

  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          {t('backBtn')}
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 break-words">
            {project?.frontmatter.title || repoData.name}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {project?.frontmatter.description || repoData.description || t('noDescription')}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm text-muted-foreground mb-8">
            {repoData.language && (
              <span className="flex items-center gap-1.5">
                <CircleDot className="w-4 h-4 text-accent" />
                {repoData.language}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              {repoData.stars}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(repoData.updatedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a href={repoData.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-muted/50 rounded-full hover:bg-muted transition-colors border border-border/50">
              <Code2 className="w-4 h-4" />
              {t('viewGithub')}
            </a>
            {project?.frontmatter.demo && (
              <a href={project.frontmatter.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors">
                <ExternalLink className="w-4 h-4" />
                {t('liveDemo')}
              </a>
            )}
          </div>

          {(project?.frontmatter.technologies || repoData.topics).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(project?.frontmatter.technologies || repoData.topics).map(tech => (
                <span key={tech} className="text-sm px-3 py-1 bg-background border border-border/50 text-muted-foreground rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl">
          {project?.content ? (
             <MDXRemote source={project.content} />
          ) : readme ? (
             <MDXRemote source={readme} />
          ) : (
             <p className="text-muted-foreground italic text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border/50">
               {locale === 'tr' ? 'Bu proje için henüz README veya detay yazısı bulunmuyor.' : 'No README or details found for this project yet.'}
             </p>
          )}
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
                    {new Date(log.frontmatter.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
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
