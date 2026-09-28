# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, Cursor, Copilot, etc.) when working with code in
this repository.

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

### Production safety is the consumer's responsibility
- This package ships raw, uncompiled source — `package.json`'s `main`/`module`/`exports` point directly at `src/index.ts`, there is no separate build/dist step for npm distribution. A consumer's own Vite/Rollup build processes these files exactly like first-party source, so whatever survives *their* tree-shaking ends up in *their* bundle.
- `c-vas-sidebar` and every feature registered under it (`c-vas-features.vue`, e.g. `c-vas-html-validation`, `c-vas-x-ray-mode`) are wired together via ordinary static imports. Nothing in this package internally gates itself behind `import.meta.env.DEV` — there is no bundling boundary here to strip dev-only code from.
- It is the **consuming project's** job to keep this out of production, e.g. by guarding its own usage of `c-vas-sidebar` (and any exported plugin, such as `vasXRayInspector`) behind `import.meta.env.DEV` — ideally via a dynamic `import()` for a stronger guarantee than relying on tree-shaking alone (see `docs/features/x-ray-mode.md` for a worked example, and this package's own `src/main.ts` for the same pattern used internally).
- Don't add dev-only guards inside this package's own components/features to compensate for a consumer skipping that step — that responsibility intentionally lives in the consumer's app entry, not here.

### Testing
- For all tasks, run all tests with `npm run test` and always fix the issues.

### Release
- `npm run release[:minor|:major]` — runs `scripts/release.mjs` (shared, identical in every shared-frontend repo):
  checks for a clean, up-to-date `main` and a non-empty `## unreleased`, bumps the version, renames
  `## unreleased` to `## vX.Y.Z`, updates the README version pin, commits, creates the annotated `vX.Y.Z` tag and
  pushes. The `Release` workflow (`.github/workflows/release.yml`) then creates the GitHub release from that
  changelog section. See `docs/contributing/release-process.md`. **Never run a release script unless explicitly
  asked.**
- Do not reintroduce an npm `version` lifecycle hook: `.npmrc` sets `ignore-scripts=true`, so `npm version` skips it.

### Documentation (strict — required for every task)
The VitePress site in `docs/` (served at https://valantic.github.io/vue-styleguide) is the source of truth for consumers. It is built via `npm run build:docs` and deployed alongside the demo (`docs/` → site root, demo app → `/demo/`) by `.github/workflows/deploy.yml`.
- Before marking any task complete, check whether it changed something a consumer-facing doc describes: the public API (`src/index.ts`), setup/installation steps, a feature under `src/features/`, config options, or the release process. If it did, update the corresponding page(s) under `docs/` in the same change — do not defer documentation to a follow-up task.
- Map of what lives where: `docs/guide/installation.md` (install), `docs/guide/setup.md` (wiring the sidebar into a consumer app — includes `docs/setup-examples/*.vue` via VitePress `<<< @/...` file includes, so keep those example files in sync instead of duplicating code in prose), `docs/guide/demo-pages.md` (Favorites/Last Opened/Readme page), `docs/guide/interface.md` (tour of every sidebar icon — keep in sync with `c-vas-panel.vue`), `docs/guide/hotkeys.md` (keyboard shortcut table — keep in sync with `src/config/hotkeys.ts`), `docs/guide/settings.md` (theme/font size, `localStorage` key reference), `docs/guide/custom-settings.md` (`#customSettings` slot on `c-vas-sidebar` and `#pageConfig` slot on `l-vas-layout`), `docs/guide/demo-card.md` (`c-vas-demo-card`), `docs/features/*.md` (one file per Features-panel toggle, e.g. `x-ray-mode.md`, `html-validation.md`), `docs/contributing/release-process.md` (release script behavior).
- Adding a new feature under `src/features/` requires a new `docs/features/<feature>.md` page plus a nav/sidebar entry in `docs/.vitepress/config.ts`. A new `localStorage` key requires a row in the table in `docs/guide/settings.md`. A new hotkey (`src/config/hotkeys.ts`) requires a row in `docs/guide/hotkeys.md`.
- Keep `README.md` short and pointed at the docs site — do not re-duplicate full guide content there; only the elevator pitch, the demo link, the docs link, the npm install snippet, and the link to the release process guide belong in the README.
- Run `npm run build:docs` after doc changes to confirm the site still builds (broken internal links fail the build).

### Changelog (required for every task)

`CHANGELOG.md` follows the convention shared by all valantic shared-frontend repos.

- Every change that alters behavior, fixes a bug, or adds/removes something consumers can see gets one entry under
  `## unreleased` in the same change — do not defer it to a follow-up task.
- Format: `- [type] Description.` — one entry per logical change, kept as a flat list (no "Added"/"Fixed" category
  subheadings), so each entry stays self-contained and merge conflicts can be resolved line by line.
- Allowed prefixes ([Conventional Commits](https://www.conventionalcommits.org/) types): `[feat]`, `[fix]`,
  `[refactor]`, `[perf]`, `[docs]`, `[test]`, `[build]`, `[ci]`, `[chore]`, `[revert]`. Older prefixes in released
  sections (`[ENHANCEMENT]`, `(Change)`, …) are history — do not reuse them and do not rewrite old entries.
- Write the description so it is understandable without the diff: name the affected module and the effect for
  consumers.
- Breaking changes are grouped under a `### Breaking Changes` subheading placed directly under `## unreleased`, above
  the regular entries. They keep their prefix and must end with a **Migration:** sentence stating what consumers
  have to do.
- A change is breaking if it alters public API shape/behavior consumers already depend on (`src/index.ts` exports, prop/emit contracts, exported types) or changes rendered output a consumer could reasonably have relied on (e.g. a BEM modifier class name a consumer might target with custom CSS). A bug fix that merely corrects behavior to match documented/intended behavior with no reasonable reliance surface is not automatically breaking — use judgment, and when in doubt, list it under `### Breaking Changes` rather than omit the migration note.
- Headings: title `# Changelog`, unreleased section `## unreleased` (exact, lowercase — release tooling matches it
  literally), released sections `## vX.Y.Z`. Only the unreleased section is edited; released sections stay as they
  are. `scripts/release.mjs` renames `## unreleased` to `## vX.Y.Z` on release.
