"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnimatedSignature({ children }: { children: React.ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowAnimation(true);
      sessionStorage.setItem('hasVisited', 'true');
      
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 1800); // 1.2s animation + 0.6s delay
      return () => clearTimeout(timer);
    }
  }, []);

  // Server-side rendering (SSR) ve Client Hydration ağaç yapısının birebir aynı olması gerekir.
  // Aksi takdirde "Encountered a script tag" veya Hydration Mismatch hataları oluşur.
  // Bu yüzden children her zaman aynı div içinde sarmalanır.
  return (
    <div className="relative flex flex-col min-h-screen">
      <AnimatePresence>
        {mounted && showAnimation && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <motion.svg
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
              <motion.path
                d="M 55,145 C 60,145 80,80 100,40 C 98,90 102,130 115,150 C 118,154 122,150 120,145"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
              />
              <motion.path
                d="M 45,115 C 80,105 120,98 155,93"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
              />
              <motion.circle
                cx="155"
                cy="93"
                r="2.5"
                className="fill-foreground stroke-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 1.2 }}
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: mounted && showAnimation ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: mounted && showAnimation ? 1.8 : 0, ease: "easeOut" }}
        className="flex flex-col flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
}
