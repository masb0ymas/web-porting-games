import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { HeroFeatured } from "./components/hero-featured";
import { LibraryBrowser } from "./components/library-browser";
import { GAMES } from "./data/games";

export default function Page() {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main>
        <HeroFeatured games={GAMES} />
        <LibraryBrowser games={GAMES} />
      </main>
      <Footer />
    </div>
  );
}
