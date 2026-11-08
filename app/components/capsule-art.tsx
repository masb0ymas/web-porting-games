import type { Game } from "../data/games";

/**
 * Vertical capsule art for list/grid items — prefers the game's portrait
 * `cover` image when available, otherwise generates a game-cover look
 * purely with CSS gradients and typographic wordmarks.
 * Horizontal art (`coverLandscape`) is reserved for the featured banner
 * in HeroFeatured — never rendered here.
 * `compact` fits tiny thumbnails: no genre chip, smaller wordmark.
 * `infoInset` lifts the wordmark above a bottom info overlay (grid cards).
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
          alt={`Cover art ${game.title}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 75% 18%, ${game.art.glow}40, transparent 62%)`,
        }}
      />
      {/* diagonal texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "repeating-linear-gradient(115deg, #fff 0 1px, transparent 1px 14px)",
        }}
      />
      {/* bottom vignette so overlay text stays readable */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />

      {!game.cover && !compact && (
        <span className="relative self-start rounded border border-white/20 bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
          {game.genres[0]}
        </span>
      )}

      {!game.cover && (
        <h3
          className={`relative mt-auto flex flex-col font-display uppercase leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] ${
            compact ? "text-[9px] leading-[1.25] break-words" : "text-xl sm:text-2xl"
          } ${infoInset ? "mb-[76px]" : ""}`}
        >
          {words.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </h3>
      )}
    </div>
  );
}
