"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Repository } from "@/lib/github";
import { STATUS_TOPICS, getStatusTopic, type StatusTopic } from "@/lib/project-status";
import { SUIT_SYMBOL, hashTilt, isRedSuit, randomTilt, rankLabel, sortByRank, suitForStatus, type Suit } from "@/lib/deck";
import { PlayingCard } from "@/components/PlayingCard";

const DEAL_MS = 650;
const DEAL_STAGGER_MS = 70;
const GATHER_MS = 300;
const EASE = "cubic-bezier(0.22,1,0.36,1)";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ProjectList({ repos }: { repos: Repository[] }) {
  const t = useTranslations("Projects");
  const [filter, setFilter] = useState<StatusTopic | "all">("all");
  const [tilts, setTilts] = useState<Record<string, number>>({});
  const [dealId, setDealId] = useState(0);

  const gridRef = useRef<HTMLUListElement>(null);
  const timers = useRef<number[]>([]);

  // Rank is the position in the FULL list, so a card keeps its rank when filtering.
  const ranked = useMemo(
    () =>
      sortByRank(repos).map((repo, index) => {
        const status = getStatusTopic(repo.topics);
        return { repo, status, suit: suitForStatus(status), rank: rankLabel(index) };
      }),
    [repos]
  );

  const shown = ranked.filter((c) => filter === "all" || c.status === filter);
  const shownKey = shown.map((c) => c.repo.name).join("|");

  const presentStatuses = new Set(
    repos.map((repo) => getStatusTopic(repo.topics)).filter((s): s is StatusTopic => s !== null)
  );

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  // Offsets from every card's slot to the deck point (centred above the grid, at its top edge).
  const measureDeck = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return [];
    const cards = [...grid.querySelectorAll<HTMLAnchorElement>("a[data-tilt]")];
    cards.forEach((el) => {
      el.style.transition = "none";
      el.style.transform = "none";
    });
    const g = grid.getBoundingClientRect();
    const deckX = g.left + g.width / 2;
    const deckY = g.top;
    return cards.map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        el,
        dx: deckX - (r.left + r.width / 2),
        dy: deckY - (r.top + r.height / 2),
        deckRot: ((i * 37) % 11) - 5,
      };
    });
  }, []);

  // Deal when the page opens and whenever the dealt set changes (filter or "deal again").
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const cards = measureDeck();
    if (cards.length === 0) return;
    clearTimers();
    cards.forEach(({ el, dx, dy, deckRot }, i) => {
      el.style.transition = "none";
      el.style.transitionDelay = "0ms";
      el.style.zIndex = String(cards.length - i);
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${deckRot}deg)`;
    });
    void gridRef.current?.offsetWidth; // force reflow
    const raf = requestAnimationFrame(() => {
      cards.forEach(({ el }, i) => {
        const tilt = el.dataset.tilt ?? "0";
        el.style.transition = `transform ${DEAL_MS}ms ${EASE}`;
        el.style.transitionDelay = `${i * DEAL_STAGGER_MS}ms`;
        el.style.transform = `rotate(${tilt}deg)`;
      });
    });
    timers.current.push(
      window.setTimeout(() => {
        cards.forEach(({ el }) => {
          el.style.zIndex = "";
          el.style.transitionDelay = "0ms";
        });
      }, DEAL_MS + cards.length * DEAL_STAGGER_MS + 50)
    );
    return () => {
      cancelAnimationFrame(raf);
      clearTimers();
    };
  }, [shownKey, dealId, measureDeck]);

  useEffect(() => () => clearTimers(), []);

  const gather = (then: () => void) => {
    if (prefersReducedMotion()) {
      then();
      return;
    }
    clearTimers();
    measureDeck().forEach(({ el, dx, dy, deckRot }) => {
      void el.offsetWidth;
      el.style.transition = `transform ${GATHER_MS}ms ease-in`;
      el.style.transitionDelay = "0ms";
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${deckRot}deg)`;
    });
    timers.current.push(window.setTimeout(then, GATHER_MS + 20));
  };

  const changeFilter = (next: StatusTopic | "all") => {
    if (next === filter) return;
    gather(() => setFilter(next));
  };

  const dealAgain = () => {
    gather(() => {
      setTilts(Object.fromEntries(repos.map((r) => [r.name, randomTilt()])));
      setDealId((n) => n + 1);
    });
  };

  const tabClass = (active: boolean) =>
    `text-sm transition-colors ${
      active
        ? "text-foreground underline underline-offset-8 decoration-1"
        : "text-muted-foreground hover:text-foreground"
    }`;

  const legend: { suit: Suit; label: string }[] = [
    { suit: "spade", label: t("status.completed") },
    { suit: "diamond", label: t("status.nearly-finished") },
    { suit: "heart", label: t("status.active") },
    { suit: "club", label: t("suitOther") },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <button type="button" onClick={() => changeFilter("all")} aria-pressed={filter === "all"} className={tabClass(filter === "all")}>
              {t("filters.all")}
            </button>
            {STATUS_TOPICS.filter((topic) => presentStatuses.has(topic)).map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => changeFilter(topic)}
                aria-pressed={filter === topic}
                className={tabClass(filter === topic)}
              >
                {t(`filters.${topic}`)}
              </button>
            ))}
          </div>
          <button type="button" onClick={dealAgain} className="ink-link text-sm text-foreground">
            {t("redeal")}
          </button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            {legend.map(({ suit, label }) => (
              <span key={suit}>
                <span aria-hidden="true" className={isRedSuit(suit) ? "text-foreground" : "text-ink-black"}>
                  {SUIT_SYMBOL[suit]}
                </span>{" "}
                {label}
              </span>
            ))}
          </p>
          <p className="mt-1">{t("suitLegend")}</p>
        </div>
      </div>

      <ul ref={gridRef} className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 list-none p-0">
        {shown.map(({ repo, status, suit, rank }) => (
          <li key={repo.name}>
            <PlayingCard
              repo={repo}
              rank={rank}
              suit={suit}
              statusLabel={status ? t(`status.${status}`) : t("suitOther")}
              noDescription={t("noDescription")}
              tilt={tilts[repo.name] ?? hashTilt(repo.name)}
            />
          </li>
        ))}

        {shown.length === 0 && (
          <li className="col-span-full py-12 text-center text-muted-foreground">
            {repos.length === 0 ? t("noRepos") : t("noFilterMatch")}
          </li>
        )}
      </ul>
    </div>
  );
}
