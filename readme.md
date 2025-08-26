# eleven-weeks-cli

Tiny terminal calendar + live clock. Shows an 11‑week rolling view and a minimal 3×5 style digital time overlay—glanceable, uncluttered.

## Features

- Rolling 11‑week view (3 past, current, 7 ahead)
- Minimal 3×5 digital clock embedded in the grid
- Arrow key navigation; today auto‑selected
- Month label shown once per month + current week dot
- Current week highlight follows today dynamically
- Configurable: week start, 12h/24h clock, theme (colorful / gray)
- Weekend headers subtly toned

## Requirements

- Node.js >= 18 (ESM + Ink v4).

## Install (once published)

```bash
npm install --global eleven-weeks-cli
```

Until published, you can clone and link locally:

```bash
git clone <repo-url> eleven-weeks-cli
cd eleven-weeks-cli
npm install
npm run build
npm link # makes `eleven-weeks-cli` available on PATH
```

## Usage

```bash
eleven-weeks-cli --help
```

Current flags:

```bash
--week-start <0-6>   Set first day of week (0=Sun, 1=Mon, ... 6=Sat). Default: 1 (Monday)
--hour12             Use 12-hour clock (default 24-hour)
--theme <name>       Theme name: "default" (colorful) | "gray" (monotone). Default: default
```

Example:

```bash
# US week (Sunday start), 12h clock, default theme
eleven-weeks-cli --week-start=0 --hour12

# Monotone gray theme
eleven-weeks-cli --theme gray
```

### Navigation

- Left / Right arrows: Move selection by 1 day.
- Up / Down arrows: Move selection by 1 week.
- (Planned) q or Ctrl+C: Quit (Ctrl+C already works by default).

### Time Overlay Logic

- Hours digits occupy rows 1–5 (top five calendar rows) and columns (1–3, 5–7).
- Minutes digits occupy rows 7–11 (bottom five rows) with same column mapping.
- Row 6 (0‑based index 5) is a visual separator (unused for digits).
- Column 4 (0‑based index 3) is a spacer between digit pairs.
- A cell “lit” for time uses the time‑on background color.

### Color / Theme

Two built‑in themes (select with `--theme`):

1. default – Colorful palette (current week highlight, purple today fill, blue time pixels, gray inactive weeks).
2. gray – Monotone subdued palette (varied grays only) for low‑distraction displays.

Visual layers (precedence, top → bottom):

1. Today background (if defined) overrides time pixels.
2. Time digit ON pixels.
3. Current week background.
4. Past / future inactive backgrounds (same gray in default now for simplicity).

Other cues:

- Selected day: bracketed like `[24]`.
- Weekend headers: lighter text (and background if theme specifies) for Sun/Sat based on configured week start.
- Month column: shows abbreviated month once per month plus a dot ● marking the current calendar week.

You can extend themes in future releases (user‑configurable themes are on the roadmap).

## Development

```bash
npm install        # install dependencies
npm run dev        # watch & compile TS -> dist
node dist/cli.js   # run the CLI directly
```

For an editable global command during development:

```bash
npm link
eleven-weeks-cli
```

Run tests (placeholder initial tests to be added):

```bash
npm test
```

## Roadmap / Planned Enhancements

- Config file & environment overrides (JSON / rc file).
- Theme customization & additional presets (auto select via env / config file).
- AM/PM indicator in 12‑hour mode.
- Improved selection styling (true borders / color inversion).
- Accessibility / alternative color schemes.
- Tests: calendar boundary cases, digit mapping, navigation wrap.
- Performance diffing / minimal re-render (opt-in if needed).

## Contributing

PRs welcome once repo is public. Please run `npm test` and ensure build passes.

## License

MIT

---

Feel free to open an issue with suggestions or feature requests. Enjoy your terminal calendar clock!
