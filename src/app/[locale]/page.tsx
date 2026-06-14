import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Mail, Terminal, Server, Globe, Shield, Code2, Star, GitBranch, GitCommit, Users, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { getAllDevLogs, getAllProjects } from '@/lib/content';
import { getGitHubStats, getRepositoryData } from '@/lib/github';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations({ locale, namespace: 'Home' });
  
  const recentLogs = getAllDevLogs(locale).slice(0, 2);
  const projects = getAllProjects(locale);
  
  const featuredProjects = projects.filter(p => p.frontmatter.featured).slice(0, 2);
  
  // GitHub verileriyle zenginleştirilmiş projeler
  const enrichedProjects = await Promise.all(featuredProjects.map(async (p) => {
    let repoData = null;
    if (p.frontmatter.github) {
       const parts = p.frontmatter.github.split('/');
       const repoName = parts[parts.length - 1];
       repoData = await getRepositoryData(repoName);
    }
    return { ...p, repoData };
  }));

  // Genel GitHub İstatistikleri
  const githubStats = await getGitHubStats();

  return (
    <div className="flex flex-col relative w-full items-center min-h-screen">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] w-full">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="font-serif italic text-[25vw] whitespace-nowrap text-foreground">
            Arda.
          </span>
        </div>

        <ScrollReveal className="z-10 flex flex-col items-center justify-center text-center max-w-3xl px-6 gap-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              {t('greeting')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <Link 
              href="/projects" 
              className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all shadow-sm"
            >
              {t('projectsBtn')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-full font-medium hover:bg-muted/80 border border-border/50 hover:border-accent/50 transition-all"
            >
              <Mail className="w-4 h-4" />
              {t('contactBtn')}
            </Link>
          </div>
        </ScrollReveal>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse opacity-40">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-foreground to-transparent" />
        </div>
      </section>

      {/* About & Expertise Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t('expertiseTitle')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t('expertiseDesc')}
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent/80 transition-colors mt-6">
              {t('expertiseLink')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <ScrollReveal delay={0.1}>
            <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <Server className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise1Title')}</h3>
              <p className="text-muted-foreground">{t('expertise1Desc')}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <Globe className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise2Title')}</h3>
              <p className="text-muted-foreground">{t('expertise2Desc')}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <Shield className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise3Title')}</h3>
              <p className="text-muted-foreground">{t('expertise3Desc')}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <Code2 className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('expertise4Title')}</h3>
              <p className="text-muted-foreground">{t('expertise4Desc')}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects Section */}
      {enrichedProjects.length > 0 && (
        <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-border/30">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-foreground">{t('featuredProjectsTitle')}</h2>
              <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                {t('viewAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {enrichedProjects.map((project, index) => (
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
                          <div className="flex items-center gap-3">
                            {project.repoData && (
                              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                                <Star className="w-3 h-3 text-accent" />
                                {project.repoData.stars}
                              </div>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              project.frontmatter.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                              project.frontmatter.status === 'completed' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {project.frontmatter.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {project.repoData?.description || project.frontmatter.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.frontmatter.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-md border border-border/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* GitHub Stats Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-border/30">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-bold text-foreground">{t('githubStatsTitle')}</h2>
             <a 
               href="https://github.com/imardagokce" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors px-4 py-2 bg-muted/30 rounded-full border border-border/50 hover:border-accent/30"
             >
                @imardagokce <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <Code2 className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
              <span className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-2">
                <AnimatedCounter value={githubStats.totalRepos} />
              </span>
              <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statRepos')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <Star className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
              <span className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-2">
                <AnimatedCounter value={githubStats.totalStars} />
              </span>
              <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statStars')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <Users className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
              <span className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-2">
                <AnimatedCounter value={githubStats.followers} />
              </span>
              <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statFollowers')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 bg-background border border-border/50 rounded-2xl hover:border-accent/40 transition-colors h-full">
              <GitCommit className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
              {githubStats.lastUpdatedRepo ? (
                <>
                  <span className="text-sm md:text-base font-bold text-foreground mb-1 px-2 truncate w-full max-w-[140px]" title={githubStats.lastUpdatedRepo.name}>
                    {githubStats.lastUpdatedRepo.name}
                  </span>
                  <span className="text-[10px] md:text-xs font-medium text-muted-foreground">
                    {t('statLast')} {new Date(githubStats.lastUpdatedRepo.updatedAt).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">-</span>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">{t('statActivity')}</span>
                </>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Dev Log Preview Section */}
      {recentLogs.length > 0 && (
        <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-border/30">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-foreground">{t('recentLogsTitle')}</h2>
              <Link href="/devlog" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                {t('viewAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-6">
            {recentLogs.map((log, index) => (
              <ScrollReveal key={log.slug} delay={index * 0.1}>
                <Link href={`/devlog/${log.slug}`} className="group block p-6 bg-background border border-border/50 rounded-2xl hover:-translate-y-1 hover:shadow-sm hover:border-accent/50 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <Terminal className="w-4 h-4 group-hover:text-accent transition-colors" />
                    <time className="font-medium">{new Date(log.frontmatter.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {log.frontmatter.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-muted/50 text-xs font-medium text-muted-foreground rounded-md mb-4 border border-border/50">
                    {t('projectLabel')} {log.frontmatter.project}
                  </span>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {log.frontmatter.summary}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full max-w-2xl mx-auto px-6 py-32 md:py-48 text-center border-t border-border/30">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            {t('ctaDesc')}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 hover:-translate-y-1 transition-all shadow-sm text-lg"
          >
            <Mail className="w-5 h-5" />
            {t('ctaBtn')}
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
