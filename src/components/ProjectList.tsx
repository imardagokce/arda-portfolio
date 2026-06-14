"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Code2, ExternalLink, Calendar, Star, CircleDot } from "lucide-react";
import { Repository } from "@/lib/github";

const OFFICIAL_TOPICS = ['active', 'completed', 'idea', 'planned', 'paused', 'archived'] as const;
type StatusTopic = typeof OFFICIAL_TOPICS[number];

export function ProjectList({ repos }: { repos: Repository[] }) {
  const t = useTranslations('Projects');
  const locale = useLocale();
  const [filter, setFilter] = useState<StatusTopic | 'all'>('all');

  // Determine status for a repo
  const getRepoStatus = (topics: string[]): StatusTopic | null => {
    const found = topics.find(t => OFFICIAL_TOPICS.includes(t as StatusTopic));
    return found ? (found as StatusTopic) : null;
  };

  const filteredRepos = repos.filter(repo => {
    if (filter === 'all') return true;
    const status = getRepoStatus(repo.topics);
    return status === filter;
  });

  const getStatusColor = (status: StatusTopic | null) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'idea': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'planned': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'paused': return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
      default: return 'bg-muted text-muted-foreground border-border/50';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            filter === 'all' 
              ? 'bg-foreground text-background border-foreground' 
              : 'bg-background text-muted-foreground border-border/50 hover:border-accent/50'
          }`}
        >
          {t('filters.all')}
        </button>
        {OFFICIAL_TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => setFilter(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              filter === topic 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-background text-muted-foreground border-border/50 hover:border-accent/50'
            }`}
          >
            {t(`filters.${topic}`)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredRepos.map((repo) => {
            const status = getRepoStatus(repo.topics);
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={repo.name}
                className="group flex flex-col h-full bg-background border border-border/50 rounded-2xl hover:shadow-sm hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors break-words line-clamp-1" title={repo.name}>
                      {repo.name}
                    </h2>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium border whitespace-nowrap ml-4 ${getStatusColor(status)}`}>
                      {status ? t(`status.${status}`) : t('status.notSpecified')}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                    {repo.description || t('noDescription')}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-6">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <CircleDot className="w-3 h-3 text-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5" title="Stars">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1.5" title="Last Updated">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(repo.updatedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <Link 
                      href={`/projects/${repo.name}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors text-sm font-medium"
                    >
                      {t('viewDetails')}
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <a 
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border/50"
                      title={t('viewGithub')}
                    >
                      <Code2 className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredRepos.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border/50"
          >
            {locale === 'tr' ? 'Bu filtreye uygun proje bulunamadı.' : 'No projects found for this filter.'}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
