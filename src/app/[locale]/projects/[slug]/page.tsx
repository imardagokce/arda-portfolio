import { getProjectBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Code2, ExternalLink, Star, Calendar, CircleDot, GitCommit, Tag } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getRepositoryData, getRepositoryReadme, getRepositoryReleases, getRepositoryCommits } from '@/lib/github';
import { getTranslations } from 'next-intl/server';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';

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

  const [readme, releases, commits] = await Promise.all([
    getRepositoryReadme(slug),
    getRepositoryReleases(slug),
    getRepositoryCommits(slug)
  ]);

  // 2. Fetch manual MDX data if it exists (for Dev Notes)
  const project = getProjectBySlug(locale, slug);

  // MDX Configuration
  const mdxOptions = {
    mdxOptions: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      remarkPlugins: [remarkGfm, remarkAlert] as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]] as any,
    }
  };

  const mdxComponents = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: (props: any) => {
      let src = props.src;
      if (src && !src.startsWith('http')) {
        // Remove leading ./ or /
        const cleanPath = src.replace(/^[./]+/, '');
        src = `https://raw.githubusercontent.com/imardagokce/${repoData.name}/${repoData.defaultBranch || 'main'}/${cleanPath}`;
      }
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} src={src} className="w-full h-auto rounded-xl border border-border/50" loading="lazy" alt={props.alt || ''} />;
    }
  };

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
          </div>

          {(repoData.topics).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(repoData.topics).map(tech => (
                <span key={tech} className="text-sm px-3 py-1 bg-background border border-border/50 text-muted-foreground rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>
      </ScrollReveal>

      {/* 1. README Section */}
      <ScrollReveal delay={0.2}>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl">
          {readme ? (
             <MDXRemote source={readme} options={mdxOptions} components={mdxComponents} />
          ) : (
             <p className="text-muted-foreground italic text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border/50">
               {locale === 'tr' ? 'Bu proje için henüz README bulunmuyor.' : 'No README found for this project yet.'}
             </p>
          )}
        </div>
      </ScrollReveal>

      {/* 2. Releases Section */}
      <section className="mt-24 pt-12 border-t border-border/50">
        <ScrollReveal>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Tag className="w-6 h-6 text-accent" />
            {t('releases')}
          </h3>
          {releases.length > 0 ? (
            <div className="space-y-4">
              {releases.map((release) => (
                <details key={release.id} className="group border border-border/50 bg-background rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors select-none">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                        {release.name}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="inline-block px-2 py-0.5 bg-muted rounded-md border border-border/50 text-xs">
                          {release.tagName}
                        </span>
                        {new Date(release.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted group-open:rotate-180 transition-transform">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </summary>
                  <div className="p-6 pt-0 border-t border-border/50 bg-muted/10">
                    <div className="prose prose-sm dark:prose-invert max-w-none mt-4 prose-a:text-accent">
                      <MDXRemote source={release.body} options={mdxOptions} components={mdxComponents} />
                    </div>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{t('noReleases')}</p>
          )}
        </ScrollReveal>
      </section>

      {/* 3. Recent Commits Section */}
      <section className="mt-16 pt-12 border-t border-border/50">
        <ScrollReveal>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <GitCommit className="w-6 h-6 text-accent" />
            {t('commits')}
          </h3>
          {commits.length > 0 ? (
            <div className="relative border-l border-border/50 ml-4 space-y-8 pb-4">
              {commits.map((commit) => (
                <div key={commit.sha} className="relative pl-8">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-foreground text-base leading-relaxed break-words pr-4">
                      {commit.message}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <time>
                        {new Date(commit.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                      <a 
                        href={commit.htmlUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors flex items-center gap-1"
                      >
                        {commit.sha.substring(0, 7)}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{t('noCommits')}</p>
          )}
        </ScrollReveal>
      </section>

      {/* 4. Development Notes (Optional) */}
      {project?.content && (
        <section className="mt-24 pt-12 border-t border-border/50">
          <ScrollReveal>
            <h3 className="text-3xl font-bold mb-8">{t('devNotes')}</h3>
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl bg-muted/10 p-8 rounded-3xl border border-border/50">
              <MDXRemote source={project.content} options={mdxOptions} components={mdxComponents} />
            </div>
          </ScrollReveal>
        </section>
      )}
    </article>
  );
}
