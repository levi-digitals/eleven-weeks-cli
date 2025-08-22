# eleven-weeks-cli

An interactive Ink (React for CLI) application that renders an 11‑week rolling calendar (plus header) and overlays the current time using colored date cells as a pair of 3×5 digit matrices (HH:MM). Designed for a quick, at‑a‑glance calendar + clock right in your terminal.

## Features

- 11 visible weeks (3 past, current, 7 future) + header row (day names) + month indicator column.
- Time display: hours (rows 1–5) and minutes (rows 7–11) encoded as two 3×5 digits each, separated by a blank row (row 6) and a blank spacer column (column 4). Columns used for digits: 1–3 and 5–7.
- Arrow key navigation (left/right by day, up/down by week); current day pre‑selected.
- Month indicator column shows the month (short name) for each week (anchored to the week’s mid date).
- Configurable (flags today, more theming to come): week start day (0=Sun..6=Sat), 12‑hour vs 24‑hour clock.
- Strongly typed TypeScript core.

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
--hour12             Use 12-hour clock (default is 24-hour)
```

Example:

```bash
eleven-weeks-cli --week-start=0 --hour12
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

### Color / Theme (Current Defaults)

| Region | Description |
| ------ | ----------- |
| Past weeks (rows 1–3) | Dim background |
| Current week (row 4) | Highlight background |
| Future weeks (rows 5–11) | Slightly different dim |
| Time ON pixels | Accent color |
| Time OFF pixels | Underlying week color |
| Selected day | Bracketed like `[15]` |
| Today | Distinct text color |
| Month column | Muted text color |

> Theming flags / config file support are planned (see Roadmap).

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

## Internal Architecture (High Level)

- `src/digits.ts` – 3×5 font & time mapping.
- `src/calendar.ts` – Calendar window generation & selection movement.
- `src/CalendarView.tsx` – Rendering & coloring logic.
- `src/App.tsx` – State wiring (config, time ticking, input handling).
- `src/theme.ts` – Default theme token set.

## Roadmap / Planned Enhancements

- Config file & environment overrides (JSON / rc file).
- Theme customization & light/dark presets.
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
