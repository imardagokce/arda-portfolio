import { getTranslations } from 'next-intl/server';
import { getRepositories } from '@/lib/github';
import { ProjectList } from '@/components/ProjectList';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const repos = await getRepositories();

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

      <ProjectList repos={repos} />
    </div>
  );
}
