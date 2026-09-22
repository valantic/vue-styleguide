---
name: vue-styleguide-demo-page
description: Generate a new demo page for a Vue component using @valantic/vue-styleguide, or restructure an existing ad-hoc one to follow the library's demo-page pattern (c-vas-demo-card vs l-vas-layout). Use when asked to add a styleguide/demo page for a component, or to clean up/align an existing one.
---

# vue-styleguide demo page

Generate or restructure a demo page for `@valantic/vue-styleguide`'s DX sidebar, following the
library's documented pattern instead of a hand-rolled layout. Full docs:
https://valantic.github.io/vue-styleguide/guide/demo-page-patterns

## Decision rule

Classify the target **before** writing anything:

1. **Small/atomic component** — a single element or component whose props/states you want to
   exercise (a button, an input, a modal, a panel action). → Use `c-vas-demo-card` inside
   `l-vas-layout`: `#header` for a title, `#demo` for the component instance(s), `#sidebar` for
   controls that drive its props/state via `v-model`. State lives in the page's own `data()`.
   Use `templates/r-component-demo.vue` as the starting point.

   - If the component renders as a full-screen overlay or otherwise must not exist twice on the
     page (modals, anything driving global state), pass `single-theme` to `c-vas-demo-card` — it
     is documented for exactly this case, since the default renders `#demo` once per theme.
   - If you need more than one state/variant matrix shown as rows × light/dark columns, prefer
     `c-vas-demo-table` (also from `@valantic/vue-styleguide/features`) over stacking many
     `c-vas-demo-card`s — it's the accepted alternative for permutation-style demos.
   - If a component has several genuinely distinct configurations that don't share one sidebar
     (e.g. five modal variants with different props), use **multiple** `c-vas-demo-card` instances
     on the same page, one per configuration, rather than forcing them into one shared sidebar.

2. **Organism / full page** — hosts many components together, or is a page-level composition a
   consumer would ship (e.g. a checkout page, a dashboard). → Use `l-vas-layout` only. Never wrap
   it in `c-vas-demo-card` — that helper is sized and styled for a single small component, not a
   whole page. Use `#pageConfig` for page-wide scenario toggles (many items in a cart, a missing
   permission, a loading/empty/error state). Use `templates/r-page-demo.vue` as the starting point.

3. **Static reference content** — prose, token tables, a marketing overview with no interactive
   state. → `l-vas-layout` only, no slots needed at all.

When restructuring an existing page, classify it first, then check whether its current structure
already matches the corresponding case — don't force a page that's correctly using `l-vas-layout`
alone (case 2/3) into a `c-vas-demo-card` it doesn't need.

## Procedure

1. Identify the target component(s) and whether this is "generate a new page" or "restructure an
   existing one".
2. Apply the decision rule above.
3. Copy the matching file from `templates/` (`r-component-demo.vue` or `r-page-demo.vue`) to the
   consumer's demo-pages location, renamed to match the component (e.g. `r-my-button.vue`), and
   update the component's `name` field to match the new filename.
4. Fill in the template: import the actual component being demoed, replace the `state` object with
   real props/scenarios, wire `#demo`/`#sidebar` (or `#pageConfig`) to it.
5. Wire the new page into the consumer's route config, following
   `docs/guide/demo-pages.md`'s pattern (`styleguideRouterConfig.rootPath` /
   `routeChildrenComponentWrapper`, a `children` entry with `meta.title`).
6. If restructuring an existing page: this rewrites hand-authored template structure, which is
   destructive to any custom layout the author may have intentionally chosen. Show the proposed
   change and get confirmation before overwriting, rather than applying it silently.

## Installing this skill in a consumer project

This folder ships inside the `@valantic/vue-styleguide` npm package at
`node_modules/@valantic/vue-styleguide/ai/skills/vue-styleguide-demo-page/`. Claude Code only
discovers skills placed in the consumer's own `.claude/skills/`, so symlink it there (recommended)
or reference it from the consumer's `CLAUDE.md` — see
https://valantic.github.io/vue-styleguide/guide/ai-skill for both options.
