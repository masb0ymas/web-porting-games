"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Game } from "../data/games";
import { CapsuleArt } from "./capsule-art";
import { PauseIcon, PlayIcon, StarIcon } from "./icons";

/** Time each featured slide stays on screen. */
const ROTATION_MS = 10_000;
/** Rotation pool is capped so the side list never outgrows the banner. */
const MAX_SLIDES = 5;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function HeroFeatured({ games }: { games: Game[] }) {
  // Curated rotation pool: every `featured` or `recommended` game (data order,
  // so the hero and the side list agree), capped at MAX_SLIDES.
  const pool = useMemo(() => {
    const curated = games.filter((game) => game.featured || game.recommended);
    return (curated.length > 0 ? curated : games).slice(0, MAX_SLIDES);
  }, [games]);

  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const slideCount = pool.length;
  const index = slideCount > 0 ? Math.min(active, slideCount - 1) : 0;
  const hero = pool[index];
  const paused = userPaused || hovered || reducedMotion;

  useEffect(() => {
    if (paused || slideCount < 2) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slideCount);
    }, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, slideCount]);

  const goTo = useCallback(
    (next: number) => {
      if (slideCount === 0) return;
      setActive(((next % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  if (!hero) return null;

  return (
    <section id="discover" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-8 sm:px-6 sm:pt-10">
      <h2 className="mb-4 font-display text-lg uppercase tracking-[0.18em] text-muted sm:text-xl">
        Featured <span className="text-white">&amp; Recommended</span>
      </h2>

      <div className="grid gap-3 lg:grid-cols-3">
        {/* Big featured banner — horizontal cover art lives here (featured mode only) */}
        <article
          aria-label={`Featured game: ${hero.title}`}
          aria-roledescription="carousel"
          role="region"
          className="group relative min-h-[320px] overflow-hidden rounded-xl ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-[0_16px_48px_-12px_rgba(102,192,244,0.25)] lg:col-span-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={() => setHovered(false)}
        >
          {/* Art layers stay mounted so rotation never flashes an empty banner */}
          {pool.map((game, i) => (
            <div
              key={game.id}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                i === index ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
            >
              {game.coverLandscape ? (
                <img
                  src={game.coverLandscape}
                  alt=""
                  fetchPriority={i === 0 ? "high" : "low"}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(120deg, ${game.art.from}, ${game.art.to})`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 80% 12%, ${game.art.glow}55, transparent 55%)`,
                    }}
                  />
                </>
              )}
            </div>
          ))}
          {/* scrim so overlay text stays readable on real art */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/60 to-black/10" />

          {/* Overlay copy — keyed so each slide animates in */}
          <div
            key={hero.id}
            aria-live={paused ? "polite" : "off"}
            className="hero-slide-in relative flex h-full flex-col justify-end p-6 sm:p-8"
          >
            <p className="mb-3 flex flex-wrap gap-2">
              {hero.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded border border-white/25 bg-black/45 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  {genre}
                </span>
              ))}
            </p>

            <h3 className="font-display text-[clamp(1.75rem,7vw,3.75rem)] uppercase leading-[1.04] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]">
              {hero.title}
            </h3>
            <p className="mt-2 text-sm text-white/80">
              {hero.studio} · {hero.year}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={hero.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Play ${hero.title} (opens in a new tab)`}
                className="flex h-11 cursor-pointer items-center gap-2 rounded-md bg-play px-5 font-semibold uppercase tracking-wider text-play-ink transition-colors duration-200 hover:bg-play-bright hover:text-abyss"
              >
                <PlayIcon className="h-4 w-4 fill-current" />
                Play Now
              </a>
              <span className="tabular flex items-center gap-1.5 text-sm text-white/85">
                <StarIcon className="h-4 w-4 text-play-bright" />
                {hero.rating.toFixed(1)}
              </span>
            </div>

            {slideCount > 1 && (
              <div className="mt-4 flex items-center gap-1">
                {pool.map((game, i) => (
                  <button
                    key={game.id}
                    type="button"
                    aria-current={i === index ? "true" : undefined}
                    aria-label={`Show ${game.title}`}
                    onClick={() => goTo(i)}
                    className="group/dot flex h-7 min-w-7 cursor-pointer items-center justify-center px-1.5"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-6 bg-play-bright"
                          : "w-2 bg-white/40 group-hover/dot:bg-white/70"
                      }`}
                    />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setUserPaused((current) => !current)}
                  aria-label={paused ? "Resume featured rotation" : "Pause featured rotation"}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white/85 transition-colors duration-200 hover:bg-black/70 hover:text-white"
                >
                  {paused ? (
                    <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  ) : (
                    <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 10s progress for the current slide */}
          {slideCount > 1 && (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
              <div
                key={hero.id}
                className="hero-progress h-full origin-left bg-play-bright/80"
                style={{
                  animationDuration: `${ROTATION_MS}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
          )}
        </article>

        {/* Side featured list — same rotation pool, active slide highlighted */}
        <div className="grid content-start gap-2" aria-label="Featured rotation">
          {pool.map((game, i) => {
            const isActive = i === index;
            return (
              <div
                key={game.id}
                className={`flex items-center gap-3 rounded-xl ring-1 transition-colors duration-300 ${
                  isActive ? "bg-steel/60 ring-accent/40" : "bg-steel-deep/80 ring-white/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${game.title}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex min-w-0 flex-1 cursor-pointer items-center gap-3 p-2.5 text-left"
                >
                  <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md">
                    <CapsuleArt game={game} compact />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center">
                    <p
                      className={`truncate text-sm font-semibold transition-colors duration-200 ${
                        isActive ? "text-white" : "text-body-text group-hover:text-white"
                      }`}
                    >
                      {game.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-steel">{game.studio}</p>
                    <p className="tabular mt-1.5 flex items-center gap-1.5 text-xs text-muted-steel">
                      <StarIcon className="h-3.5 w-3.5 text-play-bright" />
                      {game.rating.toFixed(1)}
                    </p>
                  </div>
                </button>
                <a
                  href={game.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Play ${game.title} (opens in a new tab)`}
                  className="mr-2.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-play/25 text-play-bright transition-colors duration-200 hover:bg-play-bright hover:text-abyss"
                >
                  <PlayIcon className="h-3 w-3 fill-current" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
