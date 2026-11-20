import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getRepositories } from '@/lib/github';
import { SITE_URL } from '@/lib/site';

const STATIC_PATHS = ['', '/about', '/projects', '/links', '/contact', '/privacy', '/legal'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repos = await getRepositories();

  const paths: { path: string; lastModified?: Date }[] = [
    ...STATIC_PATHS.map((path) => ({ path })),
    ...repos.map((repo) => ({
      path: `/projects/${repo.name}`,
      lastModified: new Date(repo.updatedAt),
    })),
  ];

  return paths.flatMap(({ path, lastModified }) => {
    const urlFor = (locale: string) => `${SITE_URL}/${locale}${path}`;
    const languages = Object.fromEntries(routing.locales.map((locale) => [locale, urlFor(locale)]));

    return routing.locales.map((locale) => ({
      url: urlFor(locale),
      ...(lastModified && !Number.isNaN(lastModified.getTime()) ? { lastModified } : {}),
      alternates: { languages },
    }));
  });
}
