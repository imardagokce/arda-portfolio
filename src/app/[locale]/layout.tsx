import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { AnimatedSignature } from '@/components/AnimatedSignature';
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google';
import { SITE_URL } from '@/lib/site';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | Arda',
      default: t('title'),
    },
    description: t('description'),
    // og:image, aynı klasördeki opengraph-image.tsx dosyasından otomatik üretilir.
    openGraph: {
      type: 'website',
      siteName: 'Arda',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Statik üretim için: next-intl dili istek başlığından okumak yerine buradan alır.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AnimatedSignature>
              <NavBar />
              <main className="flex-1 flex flex-col pt-24">
                {children}
              </main>
              <Footer />
            </AnimatedSignature>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
