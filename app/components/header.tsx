import { GamepadIcon } from "./icons";

const NAV_ITEMS = [
  { label: "Library", href: "#library", active: true },
  { label: "Discover", href: "#discover" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-abyss/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:h-16 sm:gap-6 sm:px-6"
      >
        <a
          href="#top"
          aria-label="RecompGames — home"
          className="flex shrink-0 cursor-pointer items-center gap-2 sm:gap-2.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent/25 to-steel text-accent sm:h-9 sm:w-9">
            <GamepadIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <span className="font-display text-xs tracking-wide text-white sm:text-lg">
            RECOMP<span className="text-accent">GAMES</span>
          </span>
        </a>

        <ul className="flex items-center gap-0.5 sm:gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`inline-flex h-9 cursor-pointer items-center rounded-md px-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 hover:bg-white/5 hover:text-white sm:px-3 sm:text-sm sm:tracking-[0.12em] ${
                  item.active ? "text-accent" : "text-muted"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
