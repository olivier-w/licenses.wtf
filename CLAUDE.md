# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start Vite dev server with HMR
bun run build    # TypeScript type-check (tsc -b) + Vite production build → dist/
bun run lint     # ESLint
bun run preview  # Preview production build locally
```

## Architecture

Single-page React app (no router) about open source licenses. Purely static — all content lives in TypeScript data files, no backend or API calls.

**Data flow:** `src/data/*.ts` (static arrays) → imported directly by section components → rendered with local React state for interactivity (filters, expand/collapse, wizard steps).

**App shell:** `App.tsx` renders a fixed `Sidebar` (desktop) / `MobileNav` (mobile) + 10 scrollable `<section>` blocks. The `useActiveSection` hook uses IntersectionObserver to track which section is in viewport and highlights the corresponding nav item.

**Section IDs** (defined in `src/lib/types.ts` as `SECTIONS`): hero, why, spectrum, licenses, comparison, compatibility, decision, how-to-apply, misconceptions, glossary. These IDs are used for scroll-to navigation and observer tracking.

## Key Conventions

- **Tailwind CSS 4** with `@tailwindcss/vite` plugin — no `tailwind.config` file. Design tokens defined via `@theme` block in `src/index.css`.
- **`cn()` utility** (`src/lib/cn.ts`): wraps `clsx` + `tailwind-merge` for conditional class merging.
- **Motion** (`motion/react`): used for animations throughout. Button press: `whileTap={{ scale: 0.97 }}`. Expandable content: `AnimatePresence` + `motion.div` with height/opacity. Staggered reveals: `delay: base + i * step`.
- **Fonts**: Space Grotesk (display/headings via `font-display`), Inter (body via `font-body`), Fira Code (mono via `font-mono`). Loaded from Google Fonts in `index.html`.
- **License spectrum colors**: `permissive` (green), `copyleft` (amber), `restrictive` (red), `source-available` (purple) — mapped via `CATEGORY_COLORS` in types.ts.
- **No barrel exports** — components imported directly from their files.
- **Light-mode only** — no dark mode.

## Data Model

All types in `src/lib/types.ts`. The core type is `License` with fields: id, spdx, name, category, permissions[], conditions[], limitations[], notableProjects[], spectrumPosition (0–100), osiApproved, tldr. 13 licenses total in `src/data/licenses.ts`.

The decision wizard uses `DecisionNode[]` in `src/data/decisionTree.ts` — a tree of questions where each option either points to the next node (`nextNodeId`) or terminates with recommended license IDs.

## Windows Environment

**Never use `/dev/null`**, `nul`, or `NUL` in bash commands — these create actual files on Windows.
