import type { Game } from "../data/games";
import { CapsuleArt } from "./capsule-art";
import { ClockIcon, PlayIcon, StarIcon } from "./icons";

export function HeroFeatured({ games }: { games: Game[] }) {
  const hero = games.find((g) => g.featured) ?? games[0];
  const side = games.filter((g) => g.featured && g.id !== hero.id).slice(0, 3);

  return (
    <section id="discover" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10">
      <h2 className="mb-4 font-display text-lg uppercase tracking-[0.18em] text-muted sm:text-xl">
        Featured <span className="text-white">&amp; Recommended</span>
      </h2>

      <div className="grid gap-3 lg:grid-cols-3">
        {/* Big featured banner — horizontal cover art lives here (featured mode only) */}
        <article
          aria-label={`Featured game: ${hero.title}`}
          className="group relative min-h-[320px] overflow-hidden rounded-xl ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-[0_16px_48px_-12px_rgba(102,192,244,0.25)] lg:col-span-2"
        >
          {hero.coverLandscape ? (
            <>
              <img
                src={hero.coverLandscape}
                alt={`Cover art ${hero.title}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* scrim so overlay text stays readable on real art */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </>
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(120deg, ${hero.art.from}, ${hero.art.to})` }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 80% 12%, ${hero.art.glow}55, transparent 55%)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, #fff 0 1px, transparent 1px 18px)",
                }}
              />
            </>
          )}

          <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
            <p className="mb-3 flex flex-wrap gap-2">
              {hero.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded border border-white/25 bg-black/30 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/85 backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </p>

            <h3 className="font-display text-4xl uppercase leading-[1.02] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] sm:text-6xl">
              {hero.title}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {hero.studio} · {hero.year}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-label={`Play ${hero.title}`}
                className="flex h-11 cursor-pointer items-center gap-2 rounded-md bg-play px-5 font-semibold uppercase tracking-wider text-play-bright transition-colors duration-200 hover:bg-play-bright hover:text-abyss"
              >
                <PlayIcon className="h-4 w-4 fill-current" />
                Play Now
              </button>
              <span className="flex items-center gap-1.5 text-sm text-white/80">
                <StarIcon className="h-4 w-4 text-play-bright" />
                {hero.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/80">
                <ClockIcon className="h-4 w-4" />
                {hero.hours}h played
              </span>
            </div>
          </div>
        </article>

        {/* Side featured list */}
        <div className="grid content-start gap-3">
          {side.map((game) => (
            <a
              key={game.id}
              href="#library"
              className="group flex cursor-pointer gap-3 rounded-xl bg-steel-deep/80 p-3 ring-1 ring-white/5 transition-colors duration-200 hover:bg-steel/60 hover:ring-accent/40"
            >
              <div className="h-24 w-[4.5rem] shrink-0 overflow-hidden rounded-md">
                <CapsuleArt game={game} compact />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <h3 className="truncate font-semibold text-body-text transition-colors duration-200 group-hover:text-white">
                  {game.title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-muted">{game.studio}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <StarIcon className="h-3.5 w-3.5 text-play-bright" />
                  {game.rating.toFixed(1)}
                  <span aria-hidden>·</span>
                  {game.hours}h
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
