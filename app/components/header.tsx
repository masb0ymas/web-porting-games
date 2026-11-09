import { GamepadIcon } from "./icons";

const NAV_ITEMS = [
  { label: "Library", href: "#library", active: true },
  { label: "Discover", href: "#discover" },
  { label: "Collections", href: "#collections" },
  { label: "Stats", href: "#stats" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-abyss/95 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:h-16 sm:gap-6 sm:px-6">
        <a
          href="#top"
          aria-label="Montara Games — home"
          className="flex shrink-0 cursor-pointer items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent/25 to-steel text-accent">
            <GamepadIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-base tracking-wide text-white sm:text-lg">
            MONTARA<span className="text-accent">GAMES</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`cursor-pointer rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-white/5 hover:text-white ${
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
