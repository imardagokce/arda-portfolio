import type { Repository } from '@/lib/github';
import type { StatusTopic } from '@/lib/project-status';

export type Suit = 'spade' | 'diamond' | 'heart' | 'club';

export const SUIT_SYMBOL: Record<Suit, string> = { spade: '♠', diamond: '♦', heart: '♥', club: '♣' };

export const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'] as const;

export function suitForStatus(status: StatusTopic | null): Suit {
  if (status === 'completed') return 'spade';
  if (status === 'nearly-finished') return 'diamond';
  if (status === 'active') return 'heart';
  return 'club';
}

export function isRedSuit(suit: Suit): boolean {
  return suit === 'heart' || suit === 'diamond';
}

/** Projects ordered by stars desc, then last-updated desc. */
export function sortByRank(repos: Repository[]): Repository[] {
  return [...repos].sort(
    (a, b) => b.stars - a.stars || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function rankLabel(index: number): string {
  return RANKS[index % RANKS.length];
}

/** Deterministic tilt in [-4, 4] degrees from a name (same on server and client). */
export function hashTilt(name: string): number {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.round((((h >>> 0) % 801) / 100 - 4) * 10) / 10;
}

export function randomTilt(): number {
  return Math.round((Math.random() * 8 - 4) * 10) / 10;
}
