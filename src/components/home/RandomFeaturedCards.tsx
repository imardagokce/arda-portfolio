"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PlayingCard } from "@/components/PlayingCard";
import type { Repository } from "@/lib/github";
import { RANKS, randomTilt, type Suit } from "@/lib/deck";

export interface FeaturedCardData {
  repo: Repository;
  // Deterministic values from the server; used for the server render and the first client render.
  rank: string;
  suit: Suit;
  tilt: number;
  // The project's REAL status label (accessible text), never the random suit.
  statusLabel: string;
}

interface DealtCard {
  rank: string;
  suit: Suit;
  tilt: number;
}

const SUITS: Suit[] = ["spade", "diamond", "heart", "club"];

/** Deal `count` distinct rank+suit pairs at random, each with a random tilt. Call only after mount. */
function dealCards(count: number): DealtCard[] {
  const pool: { rank: string; suit: Suit }[] = [];
  for (const suit of SUITS) for (const rank of RANKS) pool.push({ rank, suit });

  // Partial Fisher-Yates shuffle: the first `count` entries are distinct.
  const take = Math.min(count, pool.length);
  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, take).map(({ rank, suit }) => ({ rank, suit, tilt: randomTilt() }));
}

export function RandomFeaturedCards({
  cards,
  noDescription,
}: {
  cards: FeaturedCardData[];
  noDescription: string;
}) {
  const [dealt, setDealt] = useState<DealtCard[] | null>(null);

  // One deal after mount (never during render), so server and first client render stay identical.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- single post-hydration deal, not a cascade
    setDealt(dealCards(cards.length));
  }, [cards.length]);

  return (
    <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 list-none p-0">
      {cards.map((card, index) => {
        const d = dealt?.[index];
        return (
          <li key={card.repo.name} className="w-[calc(50%-0.75rem)] sm:w-[220px]">
            <ScrollReveal delay={index * 0.1}>
              <PlayingCard
                repo={card.repo}
                rank={d?.rank ?? card.rank}
                suit={d?.suit ?? card.suit}
                statusLabel={card.statusLabel}
                noDescription={noDescription}
                tilt={d?.tilt ?? card.tilt}
              />
            </ScrollReveal>
          </li>
        );
      })}
    </ul>
  );
}
