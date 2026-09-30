# Demo page patterns

Two building blocks are available for demo pages: `l-vas-layout` (with its `#pageConfig` slot,
see [Custom settings](/guide/custom-settings)) and `c-vas-demo-card` (see [Demo card](/guide/demo-card)).
This page gives the rule for which one to reach for.

## The rule

- **Small/atomic component** — a single element or component whose props/states you're
  exercising (a button, an input, a modal). Use `c-vas-demo-card` inside `l-vas-layout`: `#header`
  for a title, `#demo` for the component, `#sidebar` for controls that drive it. See
  `src/styleguide/demo-pages/elements/r-vas-input.vue` for the canonical shape: a `state` object in
  `data()`, rendered as a checkbox per key in `#sidebar` via `v-for="key in Object.keys(state)"`.

  `c-vas-demo-table` (`@valantic/vue-styleguide/features`) is the accepted alternative for the same
  case when a state × theme permutation matrix reads better as a table than repeated cards — see
  `src/styleguide/demo-pages/components/r-vas-panel-action.vue`. It takes `#thead`/`#tbody` slots
  and an optional `spacing` prop (default `true`) to control the margin around the table.

- **Organism / full page** — hosts many components together, or is a page-level composition a
  consumer would ship (a checkout page, a dashboard). Use `l-vas-layout` only — **never** wrap a
  page like this in `c-vas-demo-card`, which is sized and styled for a single small component.
  Use `#pageConfig` for page-wide scenario toggles instead: "many items in the cart", "missing
  permission", a loading/empty/error state. See `src/styleguide/demo-pages/components/r-vas-panel.vue`
  and `r-navigation.vue` for organism-level pages that correctly use `l-vas-layout` alone.

- **Static reference content** — prose, token tables, a marketing overview with no interactive
  state. Use `l-vas-layout` only, no slots needed.

## Choosing `single-theme`

`c-vas-demo-card` renders `#demo` once per theme by default. Pass `single-theme` when the
component must not exist twice on the page — full-screen overlays (modals) or anything driving
global state. See `src/styleguide/demo-pages/components/r-vas-modal.vue`, which uses one
`c-vas-demo-card` per modal variant, each with `single-theme`.

## When a component has several distinct configurations

If a component has multiple configurations that don't share one sidebar (e.g. several modal
variants with different props), use **multiple** `c-vas-demo-card` instances on the same page —
one per configuration — rather than forcing them into a single shared sidebar. See
`src/styleguide/demo-pages/elements/r-button.vue` and `r-vas-modal.vue`.

## Generating or restructuring demo pages with AI

The pattern above is codified as a Claude Code skill, `vue-styleguide-demo-page`, shipped with the
npm package. It generates a new demo page for a component, or restructures an existing ad-hoc one,
by applying the same small-component vs. organism vs. static classification described above. See
[AI skill](/guide/ai-skill) for what it does and how to point Claude Code at it.
