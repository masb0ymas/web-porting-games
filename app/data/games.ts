/**
 * Mock game collection data for the landing page demo.
 * Replace with real data source (API / DB) when wiring up the actual collection.
 *
 * Every entry must be playable in the browser: `link` is required, and there is
 * no play-time bookkeeping — this is a catalog of ports, not a play tracker.
 */

export interface Game {
  id: string;
  title: string;
  studio: string;
  year: number;
  genres: string[];
  /** Metacritic-style score out of 10 */
  rating: number;
  favorite: boolean;
  featured?: boolean;
  /** Shows in the "Featured & Recommended" rotation (in data order). */
  recommended?: boolean;
  /** Vertical cover for list/grid capsules (served from /public/covers). */
  cover?: string;
  /** Horizontal cover for featured-mode banner only. List items always use the vertical `cover`. */
  coverLandscape?: string;
  /** Where this game can be played on the web (opens in a new tab). */
  link: string;
  /** Capsule art colors (no external images — art is generated with CSS) */
  art: { from: string; to: string; glow: string };
}

export const GAMES: Game[] = [
  {
    id: "nfs-underground-2",
    title: "Need for Speed: Underground 2",
    studio: "EA Black Box",
    year: 2004,
    genres: ["Racing", "Tuning", "Open World"],
    rating: 8.6,
    favorite: true,
    recommended: true,
    cover: "/covers/nfs-underground-2.webp",
    coverLandscape: "/covers/nfs-underground-2-wide.webp",
    link: "https://nfsu2.xyz/",
    art: { from: "#0369a1", to: "#0c2d48", glow: "#f97316" },
  },
  {
    id: "nfs-most-wanted-2005",
    title: "Need for Speed: Most Wanted",
    studio: "EA Black Box",
    year: 2005,
    genres: ["Racing", "Police Chase"],
    rating: 9.0,
    favorite: true,
    featured: true,
    recommended: true,
    cover: "/covers/nfs-most-wanted-2005.webp",
    coverLandscape: "/covers/nfs-most-wanted-2005-bg.webp",
    link: "https://web.nfsmwo.com/",
    art: { from: "#1f2937", to: "#0b1120", glow: "#f97316" },
  },
  {
    id: "nfs-carbon",
    title: "Need for Speed: Carbon",
    studio: "EA Black Box",
    year: 2006,
    genres: ["Racing", "Canyon Duels"],
    rating: 7.8,
    favorite: false,
    recommended: true,
    cover: "/covers/nfs-carbon.webp",
    coverLandscape: "/covers/nfs-carbon-wide.webp",
    link: "https://nfscrb.xyz/",
    art: { from: "#7f1d1d", to: "#18181b", glow: "#eab308" },
  },
  {
    id: "pes-2013",
    title: "Pro Evolution Soccer 2013",
    studio: "Konami",
    year: 2012,
    genres: ["Sports", "Football"],
    rating: 8.4,
    favorite: false,
    recommended: true,
    cover: "/covers/pes-2013.webp",
    coverLandscape: "/covers/pes-2013-wide.webp",
    link: "https://pes13.optijuegos.net/pes13",
    art: { from: "#166534", to: "#052e16", glow: "#4ade80" },
  },
];
