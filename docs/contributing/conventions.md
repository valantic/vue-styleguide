# Conventions

Conventions for contributing components and code to this package. See
[CONTRIBUTING.md](https://github.com/valantic/vue-styleguide/blob/main/CONTRIBUTING.md) for the
day-to-day workflow (branching, running checks, opening a pull request) and
[AGENTS.md](https://github.com/valantic/vue-styleguide/blob/main/AGENTS.md) for the full,
authoritative set of rules this page summarizes.

## Naming and prefixes

Component filenames and their `name` field follow a fixed prefix:

- `c-vas-*` — components
- `e-vas-*` — elements
- `l-vas-*` — layouts
- `r-*` — demo/route page components (specific to this package's own demo app)

## Options API only

All components use the **Options API** (`defineComponent`) with `<script lang="ts">` — never
`<script setup>` or Composition-API-style code.

## Start from `blueprints/`

The [`blueprints/`](https://github.com/valantic/vue-styleguide/tree/main/blueprints) folder at the
repo root holds templates to copy from rather than writing a new file freehand:

- `c-component.vue` — the skeleton every `c-`/`e-`/`l-` component matches. Keep the same
  structure and ordering of Options API blocks and lifecycle hooks it defines, including the
  commented-out, unused ones — that way any component in the codebase is shaped the same way,
  whether or not it uses a given block.
- `plugin.ts` — the shape a Vue plugin like `vasXRayInspector` follows.
- `store.ts` — the shape a Pinia store follows (see `src/stores/settings.ts`).

## BEM class names

Class names are generated with `this.b(block, modifiers)` via the `vue-bem-cn` plugin, following
BEM conventions.

## Changelog

Every change that alters behavior, fixes a bug, or adds/removes something consumers can see gets
one entry under `## unreleased` in
[`CHANGELOG.md`](https://github.com/valantic/vue-styleguide/blob/main/CHANGELOG.md), in the same
change. See
[AGENTS.md's "Changelog" section](https://github.com/valantic/vue-styleguide/blob/main/AGENTS.md#changelog-required-for-every-task)
for the full prefix list and the rule for what counts as a breaking change.

## Documentation

This site is the source of truth for consumers. If a change touches the public API
(`src/index.ts`), a setup/install step, a feature under `src/features/`, a config option, or the
release process, update the matching page(s) under `docs/` in the same change — see
[AGENTS.md's "Documentation" section](https://github.com/valantic/vue-styleguide/blob/main/AGENTS.md#documentation-strict--required-for-every-task)
for the map of which page owns which piece of behavior. A new feature also needs a nav/sidebar
entry in `docs/.vitepress/config.ts`. Run `npm run build:docs` after doc changes — a broken
internal link fails the build.
