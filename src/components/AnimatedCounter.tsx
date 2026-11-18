"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1200;

// Hızlı başlayıp yavaşlayarak hedefe oturur (önceki yay animasyonuna yakın bir his).
const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

/**
 * Sayıyı ekrana girdiğinde 0'dan hedef değere sayarak gösterir.
 * "Hareketi azalt" ayarında doğrudan hedef değer gösterilir.
 */
export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setDisplay(Math.round(easeOutCubic(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-50px" }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="inline-flex items-center text-foreground">
      <span>{display}</span>
      {suffix}
    </span>
  );
}
