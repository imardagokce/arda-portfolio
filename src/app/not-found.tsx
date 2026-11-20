import Link from 'next/link';
import { Geist, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

// Kök seviyedeki 404: dil şablonuna girmeden reddedilen adresler (ör. [...rest] rotası)
// buraya düşer. Bilerek statik tutuldu: istek başlığından dil okumak bu sayfayı dinamik
// yapıyor ve diğer sayfalardaki notFound() yanıtlarının 404 kodunu bozuyordu.
// Bu yüzden mesaj iki dilde birlikte gösterilir.
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin', 'latin-ext'] });
const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  display: 'swap',
});

export default function RootNotFound() {
  return (
    <html lang="tr" className={`${geistSans.variable} ${cormorant.variable}`}>
      <head>
        <title>404</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="antialiased min-h-screen flex flex-col items-center justify-center px-6 py-24 font-sans bg-background">
        <main className="w-full max-w-[560px] text-center">
          <div className="business-card mx-auto w-full text-foreground">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="font-display smallcaps letterpress text-5xl text-foreground">404</h1>
              <p className="text-xs text-muted-foreground mt-3 tracking-[0.14em] uppercase">Bu sayfa yok</p>
              <p lang="en" className="text-xs text-muted-foreground mt-1 tracking-[0.14em] uppercase">This page does not exist</p>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-8 text-sm">
            <Link href="/tr" className="ink-link text-foreground">Ana sayfaya dön</Link>
            <Link href="/en" lang="en" className="ink-link text-foreground">Back to home</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
