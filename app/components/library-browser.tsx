"use client";

import { useMemo, useState } from "react";
import type { Game } from "../data/games";
import { CapsuleArt } from "./capsule-art";
import { ChevronDownIcon, ClockIcon, HeartIcon, PlayIcon, SearchIcon, StarIcon } from "./icons";

type Filter = "all" | "recent" | "new" | "favorite" | "complete" | "backlog";
type Sort = "recent" | "hours" | "rating" | "az";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All Games" },
  { value: "recent", label: "Recently Played" },
  { value: "new", label: "New" },
  { value: "favorite", label: "Favorites" },
  { value: "complete", label: "Completed" },
  { value: "backlog", label: "Backlog" },
];

const SORTS: { value: Sort; label: string }[] = [
  { value: "recent", label: "Recently Added" },
  { value: "hours", label: "Most Played" },
  { value: "rating", label: "Highest Rated" },
  { value: "az", label: "A → Z" },
];

function GameCard({ game }: { game: Game }) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-steel-deep ring-1 ring-white/5 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] group-hover:ring-accent/50">
        <CapsuleArt game={game} infoInset />

        {game.favorite && (
          <span className="absolute right-2 top-2 text-play-bright drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            <HeartIcon className="h-4 w-4" />
          </span>
        )}

        {/* Bottom info: always visible on touch, actions revealed on hover for pointer devices */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-3 pt-8">
          <p className="flex items-center gap-1.5 text-xs text-white/75">
            <ClockIcon className="h-3.5 w-3.5" />
            {game.lastPlayed} · {game.hours}h
          </p>
          <div className="mt-2 flex items-center gap-2 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
            {game.link ? (
              <a
                href={game.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Play ${game.title} (opens in a new tab)`}
                className="flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded bg-play text-xs font-bold uppercase tracking-wider text-play-bright transition-colors duration-200 hover:bg-play-bright hover:text-abyss"
              >
                <PlayIcon className="h-3 w-3 fill-current" />
                Play
              </a>
            ) : (
              <button
                type="button"
                aria-label={`Play ${game.title}`}
                className="flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded bg-play text-xs font-bold uppercase tracking-wider text-play-bright transition-colors duration-200 hover:bg-play-bright hover:text-abyss"
              >
                <PlayIcon className="h-3 w-3 fill-current" />
                Play
              </button>
            )}
            <span
              className="flex h-9 items-center gap-1 rounded bg-black/40 px-2.5 text-xs font-semibold text-white/85"
              aria-label={`Rated ${game.rating} out of 10`}
            >
              <StarIcon className="h-3.5 w-3.5 text-play-bright" />
              {game.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="truncate text-sm font-semibold text-body-text transition-colors duration-200 group-hover:text-white">
          {game.title}
        </h3>
        <p className="truncate text-xs text-muted">
          {game.year} · {game.genres.join(" · ")}
        </p>
      </div>
    </article>
  );
}

export function LibraryBrowser({ games }: { games: Game[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = games.filter((g) => {
      const byQuery =
        q === "" ||
        g.title.toLowerCase().includes(q) ||
        g.studio.toLowerCase().includes(q) ||
        g.genres.some((genre) => genre.toLowerCase().includes(q));
      const byFilter =
        filter === "all" ||
        (filter === "favorite" ? g.favorite : g.status === filter);
      return byQuery && byFilter;
    });

    const sorted = [...matched];
    switch (sort) {
      case "hours":
        sorted.sort((a, b) => b.hours - a.hours);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break; // keep data order = curated "recently added"
    }
    return sorted;
  }, [games, query, filter, sort]);

  const totalHours = games.reduce((sum, g) => sum + g.hours, 0);
  const completed = games.filter((g) => g.status === "complete").length;
  const canClear = query !== "" || filter !== "all";

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 pt-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-[0.14em] text-white">
            Your Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            {games.length} games · {totalHours.toLocaleString("en-US")} hours logged · {completed}{" "}
            completed
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative sm:w-64">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, studio, genre…"
              aria-label="Search games in your library"
              className="h-11 w-full rounded-md border border-white/10 bg-steel-deep pl-9 pr-3 text-sm text-body-text placeholder:text-muted/70 transition-colors duration-200 hover:border-white/20 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Sort */}
          <div className="relative sm:w-48">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort games"
              className="h-11 w-full cursor-pointer appearance-none rounded-md border border-white/10 bg-steel-deep px-3 pr-9 text-sm font-semibold text-body-text transition-colors duration-200 hover:border-white/20 focus:border-accent focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter games by status">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={`h-10 cursor-pointer rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
                active
                  ? "bg-accent text-abyss"
                  : "bg-white/5 text-muted hover:bg-steel/70 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-white/15 py-16 text-center">
          <SearchIcon className="h-8 w-8 text-muted" />
          <div>
            <p className="font-semibold text-white">No games found</p>
            <p className="mt-1 text-sm text-muted">
              Nothing matches “{query}” in this filter.
            </p>
          </div>
          {canClear && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="h-10 cursor-pointer rounded-md border border-accent/40 bg-accent/10 px-4 text-sm font-semibold text-accent transition-colors duration-200 hover:bg-accent hover:text-abyss"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </section>
  );
}
