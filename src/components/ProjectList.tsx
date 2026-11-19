"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Repository } from "@/lib/github";
import { STATUS_TOPICS, getStatusTopic, type StatusTopic } from "@/lib/project-status";
import { formatRepoName } from '@/lib/format';

export function ProjectList({ repos }: { repos: Repository[] }) {
  const t = useTranslations('Projects');
  const locale = useLocale();
  const [filter, setFilter] = useState<StatusTopic | 'all'>('all');

  // Filtre değişince kartlar View Transitions ile yerlerine kayar (destekleyen tarayıcılarda);
  // desteklenmiyorsa ya da "hareketi azalt" açıksa liste animasyonsuz güncellenir.
  const changeFilter = (next: StatusTopic | 'all') => {
    if (next === filter) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('startViewTransition' in document)) {
      setFilter(next);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => setFilter(next));
    });
  };

  // Her kartın geçişte eşleştirilebilmesi için benzersiz ve CSS'te geçerli bir ad.
  const transitionNames = new Map(repos.map((repo, index) => [repo.name, `project-card-${index}`]));

  const filteredRepos = repos.filter(repo => {
    if (filter === 'all') return true;
    const status = getStatusTopic(repo.topics);
    return status === filter;
  });

  // Yalnızca listede en az bir projesi olan durumların sekmesi gösterilir.
  const presentStatuses = new Set(
    repos.map(repo => getStatusTopic(repo.topics)).filter((s): s is StatusTopic => s !== null)
  );

  const tabClass = (active: boolean) =>
    `smallcaps text-xs transition-colors ${
      active
        ? 'text-foreground underline underline-offset-8 decoration-1'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  const dateFormatter = (value: string) =>
    new Date(value).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={() => changeFilter('all')}
          aria-pressed={filter === 'all'}
          className={tabClass(filter === 'all')}
        >
          {t('filters.all')}
        </button>
        {STATUS_TOPICS.filter(topic => presentStatuses.has(topic)).map(topic => (
          <button
            key={topic}
            type="button"
            onClick={() => changeFilter(topic)}
            aria-pressed={filter === topic}
            className={tabClass(filter === topic)}
          >
            {t(`filters.${topic}`)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredRepos.map((repo) => {
          const status = getStatusTopic(repo.topics);
          const name = formatRepoName(repo.name);

          return (
            <Link
              key={repo.name}
              href={`/projects/${repo.name}`}
              aria-label={name}
              style={{ viewTransitionName: transitionNames.get(repo.name) }}
              className="business-card block text-foreground animate-[fade-scale-in_0.2s_ease-out] motion-reduce:animate-none"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                <h2 lang="en" className="font-display smallcaps letterpress text-2xl sm:text-3xl font-medium break-words">
                  {name}
                </h2>
                <p lang={repo.description ? 'en' : undefined} className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                  {repo.description || t('noDescription')}
                </p>
              </div>

              {repo.language && (
                <span lang="en" className="absolute left-5 top-4 smallcaps text-[10px] sm:text-xs text-muted-foreground">
                  {repo.language}
                </span>
              )}
              {status && (
                <span className="absolute right-5 top-4 smallcaps text-[10px] sm:text-xs text-muted-foreground">
                  {t(`status.${status}`)}
                </span>
              )}
              <span className="absolute left-5 bottom-4 text-[10px] sm:text-xs text-muted-foreground" title="Stars">
                ★ {repo.stars}
              </span>
              <span className="absolute right-5 bottom-4 text-[10px] sm:text-xs text-muted-foreground" title="Last Updated">
                {dateFormatter(repo.updatedAt)}
              </span>
            </Link>
          );
        })}

        {filteredRepos.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground animate-[fade-in_0.2s_ease-out] motion-reduce:animate-none">
            {repos.length === 0 ? t('noRepos') : t('noFilterMatch')}
          </div>
        )}
      </div>
    </div>
  );
}
