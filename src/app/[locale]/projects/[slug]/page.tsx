import type { ComponentProps } from 'react';
import type { Metadata } from 'next';
import { getProjectBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { Link, routing } from '@/i18n/routing';
import { ScrollReveal } from '@/components/ScrollReveal';
import { GITHUB_USERNAME, getRepositories, getRepositoryData, getRepositoryReadme, getRepositoryReleases, getRepositoryCommits } from '@/lib/github';
import { formatRepoName } from '@/lib/format';
import { getStatusTopic } from '@/lib/project-status';
import { githubMarkdownOptions } from '@/lib/github-markdown';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';

// Piyasa/bahis içeriği olduğunu gösteren repo konuları; eşleşirse sayfada uyarı notu gösterilir.
const FINANCE_TOPICS = ['sports-betting', 'value-betting', 'odds', 'odds-analysis', 'algorithmic-trading', 'trading', 'stocks', 'stock-market', 'kelly-criterion'];

// Bilinen repoları her dil için build sırasında önceden üretir.
// Listede olmayan slug'lar ilk ziyarette üretilir (GitHub'a ulaşılamazsa liste boş döner).
export async function generateStaticParams() {
  const repos = await getRepositories();

  return routing.locales.flatMap((locale) =>
    repos.map((repo) => ({ locale, slug: repo.name }))
  );
}

// Başlık ve açıklama repodan gelir; varsa content/ altındaki MDX notunun başlığı/açıklaması önceliklidir.
// Buradaki GitHub isteği sayfanın kendi isteğiyle aynı olduğu için Next.js tarafından tek isteğe indirilir.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const repoData = await getRepositoryData(slug);

  // Repo bulunamazsa sayfa zaten 404 verir; genel metadata kullanılır.
  if (!repoData) return {};

  const t = await getTranslations({ locale, namespace: 'Projects' });
  const project = getProjectBySlug(locale, slug);

  return {
    title: project?.frontmatter.title || formatRepoName(repoData.name),
    description: project?.frontmatter.description || repoData.description || t('noDescription'),
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
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

  // Kartta gösterilen ad, açıklama ve durum (MDX notu önceliklidir).
  const displayName = project?.frontmatter.title || formatRepoName(repoData.name);
  const displayDescription = project?.frontmatter.description || repoData.description || t('noDescription');
  const status = getStatusTopic(repoData.topics);

  // content/ altındaki kendi MDX notların için ayarlar.
  // GitHub'dan gelen README ve release notları ayrı işlenir: bkz. lib/github-markdown.ts
  const mdxOptions: MDXRemoteProps['options'] = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkAlert],
      rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
    }
  };

  const showDisclaimer = repoData.topics.some((topic) => FINANCE_TOPICS.includes(topic));

  const mdxComponents = {
    img: (props: ComponentProps<'img'>) => {
      let src = props.src;
      if (typeof src === 'string' && src && !src.startsWith('http')) {
        // Remove leading ./ or /
        const cleanPath = src.replace(/^[./]+/, '');
        src = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoData.name}/${repoData.defaultBranch || 'main'}/${cleanPath}`;
      }
      // README görselleri GitHub'daki gibi satır içi ve kendi boyutunda gösterilir (rozetler yan yana durur,
      // büyük görseller en fazla içerik genişliğine küçülür). Boyutlar bilinmediği için next/image kullanılmaz.
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} src={src} className="inline-block max-w-full h-auto !my-0 align-middle" loading="lazy" alt={props.alt || ''} />;
    }
  };

  // README ve release notlarındaki göreli bağlantılar (LICENSE, docs/setup.md, ./CONTRIBUTING.md...)
  // GitHub'da repoya göre çözülür. Sitede olduğu gibi bırakılırsa /projects/LICENSE gibi 404 veren
  // adreslere gider; bu yüzden repodaki dosyanın GitHub sayfasına çevrilir. Klasör bağlantılarını
  // GitHub blob → tree olarak kendisi yönlendirir. Kendi MDX notların bu kurala dahil değildir:
  // onlardaki /about gibi bağlantılar site içi sayfalardır.
  const repoBlobBase = `${repoData.url}/blob/${repoData.defaultBranch || 'main'}/`;
  const githubComponents = {
    ...mdxComponents,
    a: (props: ComponentProps<'a'>) => {
      let href = props.href;
      // Tam adresler (http:, mailto:...), protokolsüz adresler (//) ve sayfa içi çapalar (#) olduğu gibi kalır.
      if (typeof href === 'string' && href && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) {
        // Baştaki "/" GitHub'da repo kökünü ifade eder.
        href = new URL(href.replace(/^\/+/, ''), repoBlobBase).toString();
      }
      return <a {...props} href={href} />;
    }
  };

  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <div className="mb-12">
          <Link href="/projects" className="ink-link text-sm text-muted-foreground">
            {t('backBtn')}
          </Link>
        </div>

        <header>
          <div className="business-card mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
              <h1
                lang={project?.frontmatter.title ? undefined : 'en'}
                className="font-display smallcaps letterpress text-3xl sm:text-4xl font-medium break-words"
              >
                {displayName}
              </h1>
              <p lang="en" className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-3">
                {displayDescription}
              </p>
            </div>

            {repoData.language && (
              <span lang="en" className="absolute left-5 top-4 smallcaps text-[10px] sm:text-xs text-muted-foreground">
                {repoData.language}
              </span>
            )}
            {status && (
              <span className="absolute right-5 top-4 smallcaps text-[10px] sm:text-xs text-muted-foreground">
                {t(`status.${status}`)}
              </span>
            )}
            <span className="absolute left-5 bottom-4 text-[10px] sm:text-xs text-muted-foreground">
              ★ {repoData.stars}
            </span>
            <span className="absolute right-5 bottom-4 text-[10px] sm:text-xs text-muted-foreground">
              {new Date(repoData.updatedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>
        </header>

        <div className="mt-10 flex flex-wrap gap-6 justify-center">
          <a href={repoData.url} target="_blank" rel="noopener noreferrer" className="ink-link text-sm text-foreground">
            {t('viewGithub')}
          </a>
        </div>

        {(repoData.topics).length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {(repoData.topics).map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
      </ScrollReveal>

      {showDisclaimer && (
        <div role="note" className="mt-12 border-t border-b border-border py-4 text-sm text-muted-foreground">
          <p>{t('disclaimer')}</p>
        </div>
      )}

      {/* 1. README Section */}
      <ScrollReveal delay={0.2}>
        <div className="mt-16 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80">
          {readme ? (
             <MDXRemote source={readme} options={githubMarkdownOptions} components={githubComponents} />
          ) : (
             <p className="text-muted-foreground italic text-center py-12">
               {locale === 'tr' ? 'Bu proje için henüz README bulunmuyor.' : 'No README found for this project yet.'}
             </p>
          )}
        </div>
      </ScrollReveal>

      {/* 2. Releases Section */}
      <section className="mt-16 pt-16 border-t border-border">
        <ScrollReveal>
          <h2 className="font-display font-medium text-foreground text-2xl sm:text-3xl mb-8">
            {t('releases')}
          </h2>
          {releases.length > 0 ? (
            <div className="divide-y divide-border">
              {releases.map((release) => (
                <details key={release.id} className="group py-6">
                  <summary className="flex items-center justify-between gap-6 cursor-pointer select-none">
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-medium text-lg text-foreground break-words">
                        {release.name}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-4 text-sm text-muted-foreground">
                        <span>{release.tagName}</span>
                        <time>{new Date(release.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                      </span>
                    </div>
                    <svg aria-hidden="true" className="shrink-0 w-3 h-3 text-muted-foreground group-open:rotate-180 transition-transform" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="pt-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-a:text-accent">
                      <MDXRemote source={release.body} options={githubMarkdownOptions} components={githubComponents} />
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
      <section className="mt-16 pt-16 border-t border-border">
        <ScrollReveal>
          <h2 className="font-display font-medium text-foreground text-2xl sm:text-3xl mb-8">
            {t('commits')}
          </h2>
          {commits.length > 0 ? (
            <div className="divide-y divide-border">
              {commits.map((commit) => (
                <div key={commit.sha} className="py-4 flex flex-col gap-2">
                  <p className="text-foreground text-base leading-relaxed break-words">
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
                      className="ink-link"
                    >
                      {commit.sha.substring(0, 7)}
                    </a>
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
        <section className="mt-16 pt-16 border-t border-border">
          <ScrollReveal>
            <h2 className="font-display font-medium text-foreground text-2xl sm:text-3xl mb-8">{t('devNotes')}</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl">
              <MDXRemote source={project.content} options={mdxOptions} components={mdxComponents} />
            </div>
          </ScrollReveal>
        </section>
      )}
    </article>
  );
}
