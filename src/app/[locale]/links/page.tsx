import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { GITHUB_USERNAME } from '@/lib/github';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const t = await getTranslations({ locale, namespace: 'Links' });

  return {
    title: tNav('links'),
    description: t('subtitle'),
  };
}

export default async function LinksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Links' });

  const links = [
    {
      name: "GitHub",
      url: `https://github.com/${GITHUB_USERNAME}`,
      handle: `github.com/${GITHUB_USERNAME}`,
      desc: t('githubDesc')
    },
    {
      name: "LinkedIn",
      url: "#",
      desc: t('linkedinDesc'),
      disabled: true,
      unavailableMessage: t('linkedinUnavailable')
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12 md:py-24">
      <ScrollReveal>
        <h1 className="font-display font-medium text-4xl sm:text-5xl letterpress text-foreground">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mt-4">
          {t('subtitle')}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
        {links.map((link, index) => (
          <ScrollReveal key={link.name} delay={index * 0.1}>
            {link.disabled ? (
              <div
                aria-disabled="true"
                className="business-card block pointer-events-none opacity-80"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h2 lang="en" className="font-display smallcaps letterpress text-3xl font-medium text-muted-foreground">
                    {link.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    {link.desc}
                  </p>
                </div>
                <p className="absolute left-5 bottom-4 smallcaps text-[10px] sm:text-xs text-muted-foreground">
                  {link.unavailableMessage}
                </p>
              </div>
            ) : (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="business-card block text-foreground"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h2 lang="en" className="font-display smallcaps letterpress text-3xl font-medium">
                    {link.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    {link.desc}
                  </p>
                </div>
                <span lang="en" className="absolute right-5 bottom-4 smallcaps text-[10px] sm:text-xs">
                  {link.handle}
                </span>
              </a>
            )}
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
