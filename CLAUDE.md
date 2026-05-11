# CLAUDE.md

## Project Overview

**salty-yatzy** is a web-based Yatzy/Yahtzee scorecard app built with SvelteKit 5, TypeScript, and Tailwind CSS v4. It supports multiple game variants (Scandinavian and Yahtzee) and multiple players. The app is deployed to Cloudflare Pages as a static site.

## Commands

```bash
make dev        # Start local dev server (npm run dev)
make build      # Build static site (npm run build)
make clean      # Remove build output (rm -rf build .svelte-kit)
npm run check   # Type-check with svelte-check
```

## Architecture

- **`src/lib/types.ts`** — Core types: `Category`, `Variant`, `Game`, `Scores`
- **`src/lib/categories.ts`** — `VARIANTS` record defining scoring categories per variant
- **`src/lib/game.ts`** — Pure game logic (totals, bonus, winner, completion)
- **`src/lib/storage.ts`** — localStorage persistence
- **`src/lib/store.svelte.ts`** — Svelte 5 runes-based reactive store
- **`src/lib/translations.ts`** — All UI strings for every supported language (`en`, `nb`, `sv`, `de`, `fr`)
- **`src/lib/i18n.svelte.ts`** — Runes-based language store; `t(key, params?)` function; `initI18n()`, `getLang()`, `setLang()`
- **`src/lib/components/`** — UI screens: `HomeScreen`, `SetupScreen`, `ScorecardScreen`, `ScoreInput`, `GameOverScreen`, `LanguagePicker`
- **`src/routes/+page.svelte`** — Single-page app entry point

## Key Conventions

- **Svelte 5 runes** are enabled for all non-`node_modules` files (`$state`, `$derived`, `$effect`)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js`)
- Adapter: `@sveltejs/adapter-cloudflare` for Cloudflare Pages deployment
- No test framework is configured
- All game state lives in `localStorage` via `storage.ts`
