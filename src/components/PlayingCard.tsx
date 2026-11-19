"use client";

import type { Ref } from "react";
import { Link } from "@/i18n/routing";
import type { Repository } from "@/lib/github";
import { formatRepoName } from "@/lib/format";
import { SUIT_SYMBOL, isRedSuit, type Suit } from "@/lib/deck";

interface PlayingCardProps {
  repo: Repository;
  rank: string;
  suit: Suit;
  statusLabel: string;
  noDescription: string;
  tilt: number;
  cardRef?: Ref<HTMLAnchorElement>;
}

export function PlayingCard({ repo, rank, suit, statusLabel, noDescription, tilt, cardRef }: PlayingCardProps) {
  const name = formatRepoName(repo.name);
  const ink = isRedSuit(suit) ? "text-foreground" : "text-ink-black";
  const symbol = SUIT_SYMBOL[suit];
  const resting = `rotate(${tilt}deg)`;

  // Hover/focus: straighten and lift. Inline styles are used because the unlayered
  // .business-card rules beat Tailwind classes.
  const lift = (el: HTMLElement) => {
    el.style.transitionDelay = "0ms";
    el.style.transition = "transform 200ms ease, box-shadow 300ms ease";
    el.style.transform = "rotate(0deg) translateY(-6px)";
  };
  const settle = (el: HTMLElement) => {
    el.style.transitionDelay = "0ms";
    el.style.transition = "transform 200ms ease, box-shadow 300ms ease";
    el.style.transform = resting;
  };

  const corner = (extra: string) => (
    <span
      aria-hidden="true"
      className={`absolute flex flex-col items-center ${ink} ${extra}`}
    >
      <span className="font-display text-xl leading-none">{rank}</span>
      <span className="text-xl leading-none">{symbol}</span>
    </span>
  );

  return (
    <Link
      ref={cardRef}
      href={`/projects/${repo.name}`}
      aria-label={`${name}, ${statusLabel}`}
      data-tilt={tilt}
      onPointerEnter={(e) => lift(e.currentTarget)}
      onPointerLeave={(e) => settle(e.currentTarget)}
      onFocus={(e) => lift(e.currentTarget)}
      onBlur={(e) => settle(e.currentTarget)}
      style={{
        position: "relative",
        aspectRatio: "5 / 7",
        transform: resting,
        transition: "transform 200ms ease, box-shadow 300ms ease",
      }}
      className={`business-card block ${ink} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground`}
    >
      {corner("left-2.5 top-2 sm:left-3 sm:top-3")}
      {corner("right-2.5 bottom-2 sm:right-3 sm:bottom-3 rotate-180")}

      <span className="sr-only">{statusLabel}</span>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h2 lang="en" className={`font-display smallcaps letterpress text-xl sm:text-2xl font-medium break-words ${ink}`}>
          {name}
        </h2>
        <div className="hidden sm:block">
          <p
            lang={repo.description ? "en" : undefined}
            className="text-xs text-muted-foreground mt-2 line-clamp-3"
          >
            {repo.description || noDescription}
          </p>
        </div>
        <p className="mt-2 flex items-center justify-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
          {repo.language && <span lang="en">{repo.language}</span>}
          <span title="Stars">★ {repo.stars}</span>
        </p>
      </div>
    </Link>
  );
}
