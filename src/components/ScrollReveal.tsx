"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  duration?: number;
}

// Görünmeden önceki kayma miktarı (öğe yerine doğru kayarak belirir).
const OFFSETS = {
  up: "translate3d(0, 40px, 0)",
  down: "translate3d(0, -40px, 0)",
  left: "translate3d(40px, 0, 0)",
  right: "translate3d(-40px, 0, 0)",
};

/**
 * İçeriği ekrana girdiğinde bir kez, kayarak ve belirerek gösterir.
 * IntersectionObserver + CSS geçişiyle çalışır; "hareketi azalt" ayarında içerik
 * hareketsiz ve hemen görünür.
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.9,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-20px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] ease-[cubic-bezier(0.21,0.47,0.32,0.98)] motion-reduce:transition-none motion-reduce:opacity-100! motion-reduce:transform-none! ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : OFFSETS[direction],
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
