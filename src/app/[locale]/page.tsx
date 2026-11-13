import { CtaSection } from '@/components/home/CtaSection';
import { ExpertiseSection } from '@/components/home/ExpertiseSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { GitHubStatsSection } from '@/components/home/GitHubStatsSection';
import { HeroSection } from '@/components/home/HeroSection';
import { getGitHubStats, getRepositories } from '@/lib/github';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Repolar ve genel GitHub istatistikleri paralel çekilir
  const [allRepos, githubStats] = await Promise.all([getRepositories(), getGitHubStats()]);

  // En çok yıldız alan 2 projeyi öne çıkar
  const featuredProjects = [...allRepos].sort((a, b) => b.stars - a.stars).slice(0, 2);

  return (
    <div className="flex flex-col relative w-full items-center min-h-screen">
      <HeroSection locale={locale} />
      <ExpertiseSection locale={locale} />
      <FeaturedProjects locale={locale} projects={featuredProjects} />
      <GitHubStatsSection locale={locale} githubStats={githubStats} />
      <CtaSection locale={locale} />
    </div>
  );
}
