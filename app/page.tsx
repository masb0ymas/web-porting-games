import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { HeroFeatured } from "./components/hero-featured";
import { LibraryBrowser } from "./components/library-browser";
import { GAMES } from "./data/games";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

// Only games with a real play link go in structured data; ratings/hours are mock, so no aggregateRating.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/`, description: SITE_DESCRIPTION },
    {
      "@type": "ItemList",
      name: "Games playable in the browser",
      itemListElement: GAMES.filter((g) => g.link).map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: g.title,
          url: g.link,
          genre: g.genres,
          gamePlatform: "Web browser",
          author: { "@type": "Organization", name: g.studio },
          ...(g.cover && { image: `${SITE_URL}${g.cover}` }),
        },
      })),
    },
  ],
};

export default function Page() {
  return (
    <div id="top" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <h1 className="sr-only">{SITE_NAME}: play classic PC racing games in your browser</h1>
        <HeroFeatured games={GAMES} />
        <LibraryBrowser games={GAMES} />
      </main>
      <Footer />
    </div>
  );
}
