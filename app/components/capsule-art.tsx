import type { Game } from "../data/games";

/**
 * Vertical capsule art for list/grid items — prefers the game's portrait
 * `cover` image when available, otherwise generates a game-cover look
 * purely with CSS gradients and typographic wordmarks.
 * Horizontal art (`coverLandscape`) is reserved for the featured banner
 * in HeroFeatured — never rendered here.
 * `compact` fits tiny thumbnails: no genre chip, smaller wordmark.
 * `infoInset` lifts the wordmark above a bottom info overlay (grid cards).
 *
 * The art is decorative: the game title is always rendered as text next to
 * it, so the image carries an empty alt and stays out of the a11y tree.
 */
export function CapsuleArt({
  game,
  compact = false,
  infoInset = false,
}: {
  game: Game;
  compact?: boolean;
  infoInset?: boolean;
}) {
  const words = game.title.split(":")[0].split(" ");
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden ${compact ? "p-2" : "p-4 sm:p-5"}`}
      style={{ background: `linear-gradient(135deg, ${game.art.from}, ${game.art.to})` }}
    >
      {game.cover && (
        <img
          src={game.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {!game.cover && (
        // Glow belongs to generated art only — on a real cover it reads as a spotlight smudge.
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 75% 18%, ${game.art.glow}40, transparent 62%)`,
          }}
        />
      )}
      {/* bottom vignette so overlay text stays readable */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />

      {!game.cover && compact && (
        // Tiny rotation thumbnail: initials only. At 48px a wordmark truncates to noise;
        // the full title sits in the row right beside it.
        <p
          aria-hidden
          className="relative mt-auto font-display text-[11px] uppercase leading-none tracking-[0.06em] text-white/75"
        >
          {words
            .slice(0, 2)
            .map((word) => word[0])
            .join("")}
        </p>
      )}

      {!game.cover && !compact && (
        <>
          <span className="relative self-start rounded border border-white/20 bg-black/40 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
            {game.genres[0]}
          </span>
          {/* Decorative wordmark — the real title heading lives on the card, so keep it out of the outline.
              Tiny rotation thumbnails carry no wordmark: the row's title sits right beside them. */}
          <p
            aria-hidden
            className={`relative mt-auto flex flex-col font-display text-xl uppercase leading-[1.15] tracking-[0.01em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] ${
              infoInset ? "mb-[88px]" : ""
            }`}
          >
            {words.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </p>
        </>
      )}
    </div>
  );
}
