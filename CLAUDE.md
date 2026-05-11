# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@valantic/vue-styleguide` is a Vue 3 library that provides a DX utility sidebar (`c-vas-sidebar`) for use during development in consumer Vue 3 projects. It acts as a testing harness with navigation, config toggles, and demo page infrastructure. The sidebar is only ever loaded in `DEV` mode (see `src/main.ts`).

## Commands

```bash
npm run dev          # Start Vite dev server (serves the internal demo app)
npm run build        # Build app (mode=app, output to dist/app/)
npm run lint         # ESLint + Stylelint + TypeScript check (all three)
npm run lint:eslint  # ESLint only
npm run lint:stylelint  # Stylelint only
npm run tsc          # TypeScript check (vue-tsc)
npm run test         # Lint + unit tests (non-watch)
npm run test:unit    # Vitest unit tests (watch mode by default)
npm run build:icons  # Regenerate SVG sprite + update TS icon type union
npm run prettier     # Format all files
```

Run a single test file:
```bash
npx vitest tests/unit/specs/components/c-vas-navigation.test.ts
```

## Architecture

### Public API (`src/index.ts`)
Only four things are exported for consumer projects:
- `cVasSidebar` — the main sidebar component
- `styleguideRouterConfig` — `{ rootPath: '/sg', routeChildrenComponentWrapper }` for wiring up Vue Router
- `styleguideTestPages` — pre-built route configs (e.g. `readme`)
- `rDemoReadmePage` — the README demo page component

### Directory structure
- `src/components/` — internal `c-vas-*` components (sidebar, flyout, navigation, modal, etc.)
- `src/elements/` — atomic `e-vas-*` elements (button, input, icon, toggle, etc.)
- `src/layouts/` — `l-vas-layout.vue` wrapper for demo pages
- `src/styleguide/` — the internal demo app; only loaded in DEV mode
  - `setup/routes.ts` — demo page routes for this repo's own dev server
  - `setup/public-demo-routes.ts` — `styleguideTestPages`, exported as part of the public API
  - `demo-pages/` — route components (`r-*`) for the dev server
- `src/stores/` — plain reactive stores (no Pinia/Vuex); uses `vue`'s `reactive()`
  - `session.ts` — tracks last 5 opened routes and whether current page has a config
  - `helper.ts` — localStorage helpers with `vas-` key prefix
- `src/setup/` — app bootstrapping: plugins, directives, global styles, breakpoints
- `src/plugins/vue-bem-cn/` — custom BEM class name plugin; exposed via `b()` in all components
- `src/types/` — shared TypeScript types (`RouteMeta`, `Route`, `StyleguideRouterConfig`, etc.)
- `tests/unit/specs/` — Vitest tests using `@vue/test-utils`

### Component conventions
- Component filenames and `name` field follow `c-vas-*` / `e-vas-*` / `l-vas-*` prefixes
- Demo/route page components use `r-*` prefix
- All components use the **Options API** (`defineComponent`) — not the Composition API
- BEM class names are generated with `this.b(block, modifiers)` via the `vue-bem-cn` plugin

### Styling
- SCSS with BEM; global design tokens in `src/setup/scss/_variables.scss`
- Always import with `@use '../setup/scss/variables'` and `@use '../setup/scss/mixins'` (namespaced, not `@import`)
- The `vas-styleguide-reset` CSS reset wrapper is applied at the root of `c-vas-sidebar` to scope the reset

### Icons
SVG sprite lives in `src/assets/icons/`. After adding/removing SVG files, run `npm run build:icons` to regenerate the sprite and update the `Icon` TypeScript union type.

### Build modes
Build modes are defined in `vite.builds.json`. The only current mode is `app` (entry: `src/main.ts`). The `vite.config.ts` throws if an unknown mode is passed.
