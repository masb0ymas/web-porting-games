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
  /** Extra search terms players type but that never appear in the title (abbreviations, series). */
  keywords?: string[];
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
    keywords: ["nfs", "nfsu2", "underground"],
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
    keywords: ["nfs", "nfsmw", "police"],
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
    keywords: ["nfs", "carbon"],
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
    keywords: ["pes", "soccer", "pro evo"],
    art: { from: "#166534", to: "#052e16", glow: "#4ade80" },
  },
  {
    id: "skate-3",
    title: "Skate 3",
    studio: "EA Black Box",
    year: 2010,
    genres: ["Skateboarding", "Sports", "Open World"],
    rating: 8.0,
    favorite: false,
    recommended: true,
    cover: "/covers/skate-3.webp",
    coverLandscape: "/covers/skate-3-wide.webp",
    link: "https://skate3browser.org/",
    keywords: ["skate", "skating", "ea"],
    art: { from: "#c2410c", to: "#1c1917", glow: "#fb923c" },
  },
  {
    id: "gta-3",
    title: "Grand Theft Auto III",
    studio: "DMA Design",
    year: 2001,
    genres: ["Action", "Open World", "Crime"],
    rating: 8.7,
    favorite: false,
    cover: "/covers/gta-3.webp",
    coverLandscape: "/covers/gta-3-wide.webp",
    link: "https://pixr.dev/gta/gta3/",
    keywords: ["gta", "gta3", "gta 3", "grand theft auto"],
    art: { from: "#1e3a8a", to: "#171717", glow: "#ef4444" },
  },
  {
    id: "gta-vice-city",
    title: "Grand Theft Auto: Vice City",
    studio: "Rockstar North",
    year: 2002,
    genres: ["Action", "Open World", "Crime"],
    rating: 9.2,
    favorite: false,
    cover: "/covers/gta-vice-city.webp",
    coverLandscape: "/covers/gta-vice-city-wide.webp",
    link: "https://pixr.dev/gta/gtavc/",
    keywords: ["gta", "gtavc", "vice city"],
    art: { from: "#be185d", to: "#0f172a", glow: "#f472b6" },
  },
  {
    id: "gta-san-andreas",
    title: "Grand Theft Auto: San Andreas",
    studio: "Rockstar North",
    year: 2004,
    genres: ["Action", "Open World", "Crime"],
    rating: 9.5,
    favorite: false,
    cover: "/covers/gta-san-andreas.webp",
    coverLandscape: "/covers/gta-san-andreas-wide.webp",
    link: "https://pixr.dev/gta/gtasa/",
    keywords: ["gta", "gtasa", "san andreas"],
    art: { from: "#a16207", to: "#0c0a09", glow: "#facc15" },
  },
  {
    id: "gta-v",
    title: "Grand Theft Auto V",
    studio: "Rockstar North",
    year: 2013,
    genres: ["Action", "Open World", "Crime"],
    rating: 9.7,
    favorite: false,
    cover: "/covers/gta-v.webp",
    coverLandscape: "/covers/gta-v-wide.webp",
    link: "https://playgta5.com/",
    keywords: ["gta", "gta5", "gta v", "gta 5", "five"],
    art: { from: "#166534", to: "#0b1120", glow: "#22c55e" },
  },
];
