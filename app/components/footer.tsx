import { GamepadIcon } from "./icons";

const FOOTER_LINKS = [
  { label: "Library", href: "#library" },
  { label: "Discover", href: "#discover" },
  { label: "GitHub", href: "https://github.com/masb0ymas/web-porting-games" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-abyss">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-steel text-accent">
              <GamepadIcon className="h-4 w-4" />
            </span>
            <span className="font-display text-sm tracking-wide text-white">
              MONTARA<span className="text-accent">GAMES</span>
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-1 gap-y-1">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex min-h-9 cursor-pointer items-center rounded-md px-2 text-sm text-muted transition-colors duration-200 hover:bg-white/5 hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 max-w-[70ch] text-xs leading-relaxed text-muted">
          Demo UI for the port-to-web project. Game data is mock data — layout and interaction
          inspired by the Steam™ library experience. Not affiliated with Valve Corporation.
        </p>
      </div>
    </footer>
  );
}
