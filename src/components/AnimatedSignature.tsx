"use client";

import { useEffect, useState } from 'react';

// Oturumdaki ilk ziyarette imza çizilir (2,4 sn), ardından perde 0,8 sn'de kaybolur.
const INTRO_MS = 2400;
const FADE_MS = 800;
const STORAGE_KEY = 'hasVisited';

type Phase = 'hidden' | 'drawing' | 'fading';

function hasVisited() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return true; // Depolama kapalıysa animasyonu her sayfada tekrar göstermemek için atla.
  }
}

function markVisited() {
  try {
    sessionStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Depolama kapalı; yapılacak bir şey yok.
  }
}

export function AnimatedSignature({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('hidden');

  useEffect(() => {
    if (hasVisited()) return;

    // "Hareketi azalt" ayarında giriş animasyonu hiç gösterilmez.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markVisited();
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage yalnızca istemcide okunabilir; tek seferlik giriş animasyonu
    setPhase('drawing');
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
      markVisited();
    }, INTRO_MS);
    const doneTimer = setTimeout(() => setPhase('hidden'), INTRO_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Sunucu ve istemci ağacı birebir aynı kalsın diye children her zaman aynı div içinde sarmalanır;
  // perde yalnızca istemcide, sonradan eklenir (hydration uyumsuzluğu oluşmaz).
  return (
    <div className="relative flex flex-col min-h-screen">
      {phase !== 'hidden' && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-[800ms] ease-in-out ${phase === 'fading' ? 'opacity-0' : 'opacity-100'}`}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          >
            {/* pathLength=1 sayesinde çizgi, uzunluğundan bağımsız olarak 1 → 0 kaydırılarak çizilir. */}
            <path
              d="M 55,145 C 60,145 80,80 100,40 C 98,90 102,130 115,150 C 118,154 122,150 120,145"
              pathLength={1}
              strokeDasharray={1}
              className="animate-[signature-draw_0.9s_ease-in-out_0.1s_both]"
            />
            <path
              d="M 45,115 C 80,105 120,98 155,93"
              pathLength={1}
              strokeDasharray={1}
              className="animate-[signature-draw_0.6s_ease-out_1s_both]"
            />
            <circle
              cx="155"
              cy="93"
              r="2.5"
              className="fill-foreground stroke-none origin-center [transform-box:fill-box] animate-[signature-dot_0.4s_ease-out_1.6s_both]"
            />
          </svg>
        </div>
      )}

      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}
