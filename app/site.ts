/** Public origin used for canonical URLs, sitemap and Open Graph. Set SITE_URL in production. */
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "RecompGames";
export const SITE_DESCRIPTION =
  "Play classic PC racing games like Need for Speed Underground 2, Most Wanted and Carbon right in your browser. Browse the RecompGames library and jump in.";
