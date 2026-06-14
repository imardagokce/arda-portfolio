import { getDevLogBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Terminal } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function DevLogDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const log = getDevLogBySlug(locale, slug);
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const tDev = await getTranslations({ locale, namespace: 'Devlog' });

  if (!log) {
    notFound();
  }

  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <Link href="/devlog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          {tNav('backToDevlog')}
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <Terminal className="w-4 h-4 text-accent" />
            <time className="font-medium">{new Date(log.frontmatter.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            {log.frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-muted/50 text-sm font-medium text-muted-foreground rounded-md border border-border/50">
              {tDev('projectLabel')} {log.frontmatter.project}
            </span>
          </div>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80">
          <MDXRemote source={log.content} />
        </div>
      </ScrollReveal>
    </article>
  );
}
