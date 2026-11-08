# Page Override: Landing (Game Collection Library)

> Halaman: `app/page.tsx` — landing page game collection, referensi visual **Steam library**.
> File ini **meng-override** `MASTER.md` untuk halaman landing (keputusan user: palet mengikuti Steam, bukan palet purple/rose dari database skill).

## Palette (Steam-inspired)

| Token | Hex | Pemakaian |
|---|---|---|
| `abyss` | `#171a21` | top nav, footer |
| `navy` | `#1b2838` | page background |
| `steel` | `#2a475e` | surface/hover |
| `steel-deep` | `#16202d` | input, card base |
| `accent` | `#66c0f4` | link, active chip, focus ring (Steam blue) |
| `body-text` | `#c7d5e0` | teks utama |
| `muted` | `#8f98a0` | teks sekunder |
| `play` / `play-bright` | `#5c7e10` / `#a4d007` | CTA hijau ala tombol install Steam |

## Typography

- **Montserrat** (variable 100–900) untuk semuanya — keputusan user (2026-11-08), menggantikan Russo One + Chakra Petch.
- Display (judul, wordmark, brand) = Montserrat `font-weight: 900` uppercase (di-apply via rule `.font-display` di globals.css).
- Body/UI = Montserrat weight default (400/500/600 per komponen).

## Pattern

Feature-Rich Showcase ala Steam: Hero "Featured & Recommended" (banner besar + 3 kartu samping) → "Your Library" (search + sort + filter chips + grid capsule 3:4) → footer. Tanpa carousel auto-rotate (keputusan aksesibilitas).

## Art

Dua jenis cover per game (`/public/covers`):
- `cover` (vertikal 3:4) — untuk **list/grid capsule** dan thumbnail samping featured. Tanpa cover → fallback art generatif (gradient + wordmark + glow). Cover NFS vertikal: Wikia boxart (perlu header Referer), Reddit 4K upscale (`i.redd.it`), gstatic boxart.
- `coverLandscape` (horizontal) — **khusus banner Featured** (`HeroFeatured`), dengan scrim bawah agar teks overlay terbaca. List item tidak pernah memakai cover horizontal.

Props `CapsuleArt`: `compact` (thumbnail kecil), `infoInset` (angkat wordmark di atas overlay info grid card).

## Interaksi

- Card hover (pointer device): lift + ring accent + reveal tombol Play & rating; di layar sentuh info selalu terlihat (`md:opacity-0 md:group-hover:opacity-100`).
- Filter chips: `aria-pressed`, status-based (All/Recent/New/Favorites/Completed/Backlog).
- Search + sort bekerja pada state client (`LibraryBrowser`); selebihnya Server Components.

## Checklist pre-delivery (dari MASTER, terverifikasi)

- [x] Tanpa emoji sebagai ikon (SVG inline lucide-style)
- [x] `cursor-pointer` pada elemen klikabel
- [x] Transisi hover 150–300ms
- [x] Kontras teks 4.5:1 di dark mode
- [x] `:focus-visible` ring accent
- [x] `prefers-reduced-motion` dinonaktifkan
- [x] Responsif 375 / 768 / 1024 / 1440px, tanpa horizontal scroll
