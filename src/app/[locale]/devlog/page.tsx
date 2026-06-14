import { getAllDevLogs } from '@/lib/content';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Terminal } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function DevLogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Devlog' });
  const logs = getAllDevLogs(locale);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-6">
        {logs.map((log, index) => (
          <ScrollReveal key={log.slug} delay={index * 0.1}>
            <Link 
              href={`/devlog/${log.slug}`}
              className="group block p-6 bg-background border border-border/50 rounded-2xl hover:-translate-y-1 hover:shadow-sm hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <Terminal className="w-4 h-4 group-hover:text-accent transition-colors" />
                <time className="font-medium">{new Date(log.frontmatter.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                {log.frontmatter.title}
              </h2>
              <span className="inline-block px-3 py-1 bg-muted/50 text-xs font-medium text-muted-foreground rounded-md mb-4 border border-border/50">
                {t('projectLabel')} {log.frontmatter.project}
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {log.frontmatter.summary}
              </p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
