'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';

type Item = { title: string; desc: string };

type Props = {
  centre: ReactNode;
  items: Item[];
  prevLabel: string;
  nextLabel: string;
  /** Contains the literal placeholders {current} and {total}. */
  positionTemplate: string;
  groupLabel: string;
};

const CARD_W = 320;
const CARD_H = (CARD_W * 2) / 3.5;
const SIDE_SCALE = 0.62 + 0.38 * 0.5;
const CENTRE_MAX_W = 448;
const SWIPE_MIN = 40;

const mod = (n: number, m: number) => ((n % m) + m) % m;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServer = () => false;

export function ExpertiseOrbit({ centre, items, prevLabel, nextLabel, positionTemplate, groupLabel }: Props) {
  const count = items.length;
  // Continuous step counter: only ever moves by whole steps, so the orbit never spins backwards.
  const [pos, setPos] = useState(0);
  const active = mod(pos, count);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);

  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const centreRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardH = useRef(CARD_H);
  const [geo, setGeo] = useState({ desktop: false, rx: 0, ry: 0, height: 0 });
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setPos((p) => p + (mod(index - mod(p, count) + 2, count) - 2));
    },
    [count],
  );
  const step = useCallback((dir: 1 | -1) => setPos((p) => p + dir), []);

  // Derive the ellipse from the measured centre block; fall back to the single card when too narrow.
  useEffect(() => {
    const wrap = wrapRef.current;
    const centre = centreRef.current;
    if (!wrap || !centre) return;
    const compute = () => {
      const w = wrap.clientWidth;
      const cw = Math.min(CENTRE_MAX_W, w);
      const ch = centre.offsetHeight;
      cardRefs.current.forEach((b) => {
        if (b) cardH.current = Math.max(cardH.current, b.offsetHeight);
      });
      const h = cardH.current;
      const rx = Math.round(cw / 2 + (CARD_W * SIDE_SCALE) / 2 + 48);
      const ry = Math.round(ch / 2 + h / 2 + 40);
      const next = {
        desktop: w >= 2 * rx + CARD_W * SIDE_SCALE,
        rx,
        ry,
        height: Math.round(2 * ry + h + 32),
      };
      setGeo((g) =>
        g.desktop === next.desktop && g.rx === next.rx && g.ry === next.ry && g.height === next.height ? g : next,
      );
    };
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    ro.observe(centre);
    cardRefs.current.forEach((b) => b && ro.observe(b));
    return () => ro.disconnect();
  }, [items]);

  // Scroll-driven rotation: passive listener + rAF, never prevents default, never pins.
  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    let frame = 0;
    let lastStep = -1;

    const compute = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const s = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
      if (lastStep === -1) {
        lastStep = s;
        return;
      }
      if (s !== lastStep) {
        lastStep = s;
        goTo(s);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, count, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      step(1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  const position = positionTemplate
    .replace('{current}', String(active + 1))
    .replace('{total}', String(count));

  const current = items[active];

  return (
    <div
      ref={sectionRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={groupLabel}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={geo.desktop ? undefined : 'mt-12'}
    >
      <div
        ref={wrapRef}
        className="relative mx-auto max-w-6xl"
        style={geo.desktop ? { perspective: '1200px', height: geo.height } : undefined}
      >
        <div
          ref={centreRef}
          className={
            geo.desktop
              ? 'absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 text-center'
              : 'max-w-md'
          }
        >
          {centre}
        </div>

        {/* Mobile: one swipeable card */}
        <div className={geo.desktop ? 'hidden' : 'mt-10'} aria-hidden="true">
          <div className="business-card aspect-auto p-6 text-center">
            <p className="font-display smallcaps letterpress text-2xl text-foreground">{current.title}</p>
            <p className="text-sm text-muted-foreground mt-2">{current.desc}</p>
          </div>
        </div>

        {/* Desktop: orbiting satellites */}
        <div className={geo.desktop ? 'block' : 'hidden'}>
          {items.map((item, i) => {
            const theta = ((i - pos) * 90 * Math.PI) / 180;
            const x = geo.rx * Math.sin(theta);
            const y = geo.ry * Math.cos(theta);
            const d = Math.cos(theta);
            const k = (d + 1) / 2;
            const scale = 0.62 + 0.38 * k;
            const opacity = 0.35 + 0.65 * k;
            const isFront = i === active;
            return (
              <button
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                aria-label={item.title}
                aria-current={isFront ? 'true' : undefined}
                onClick={() => goTo(i)}
                className="business-card left-1/2 top-1/2 w-[320px] cursor-pointer p-6 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                style={{
                  // Inline so these win over the unlayered .business-card rules (position, transition, hover transform).
                  position: 'absolute',
                  transition: reduced
                    ? 'none'
                    : 'transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms',
                  transform: `translate(-50%,-50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
                  opacity,
                  zIndex: d > 0.001 ? 30 : 10,
                }}
              >
                <span className="block font-display smallcaps letterpress text-2xl text-foreground">{item.title}</span>
                {isFront && <span className="block text-sm text-muted-foreground mt-2">{item.desc}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-sm">
        <button
          type="button"
          onClick={() => step(-1)}
          className="ink-link text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          {prevLabel}
        </button>
        <span className="text-muted-foreground">{position}</span>
        <button
          type="button"
          onClick={() => step(1)}
          className="ink-link text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          {nextLabel}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {current.title}
      </p>
      <ul className="sr-only">
        {items.map((item, i) => (
          <li key={i}>
            {item.title}: {item.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}
