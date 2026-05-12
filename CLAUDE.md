# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@valantic/vue-styleguide` is a Vue 3 library that provides a DX utility sidebar (`c-vas-sidebar`) for use during development in consumer Vue 3 projects. It acts as a testing harness with navigation, config toggles, and demo page infrastructure. The sidebar is only ever loaded in `DEV` mode (see `src/main.ts`).

## Architecture

### Public API (`src/index.ts`)
Only four things are exported for consumer projects:
- `cVasSidebar` — the main sidebar component
- `styleguideRouterConfig` — `{ rootPath: '/sg', routeChildrenComponentWrapper }` for wiring up Vue Router
- `styleguideTestPages` — pre-built route configs (e.g. `readme`)
- `rDemoReadmePage` — the README demo page component

### Component conventions
- Component filenames and `name` field follow `c-vas-*` / `e-vas-*` / `l-vas-*` prefixes
- Demo/route page components use `r-*` prefix
- All components use the **Options API** (`defineComponent`) — not the Composition API
- BEM class names are generated with `this.b(block, modifiers)` via the `vue-bem-cn` plugin
- Fully respect the boilerplate conventions in [blueprints folder](./blueprints)
- For components always keep the same structure and sorting of the lifecycle hooks as defined in the [c-component.vue](./blueprints/c-component.vue) also keep the commented-out functions.

### Styling
- SCSS with BEM; global design tokens in `src/setup/scss/_variables.scss`
- Always import with `@use '../setup/scss/variables'` and `@use '../setup/scss/mixins'` (namespaced, not `@import`)
- The `vas-styleguide-reset` CSS reset wrapper is applied at the root of `c-vas-sidebar` to scope the reset

### Testing
- For all tasks, run all tests with `npm run test` and always fix the issues.
