# X-ray mode

X-ray mode is a hover inspector built into the styleguide sidebar. Turn it on (Features panel, or
`Ctrl/⌘ + Shift + X`), then hover any element on the page to see the name and source file of the
Vue component it belongs to — click to copy `ComponentName (src/path/to/File.vue)` to your
clipboard, ready to paste into an AI coding prompt.

## Setup (recommended)

X-ray mode works out of the box with zero configuration, but its accuracy is limited without one
extra step: register the `vasXRayInspector` plugin once, before `app.mount()`. Import it
dynamically inside a dev-only check — the same pattern this package's own `main.ts` uses for its
dev-only setup — so it's never even requested in a production build:

```js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

if (import.meta.env.DEV) {
  const { vasXRayInspector } = await import('@valantic/vue-styleguide');

  app.use(vasXRayInspector);
}

app.mount('#app');
```

If you see a warning under the "X-ray mode" toggle in the Features panel, this step is missing (or
was registered on a different app instance than the one the sidebar is mounted in).

Note this only guards the plugin's own registration. The x-ray overlay UI itself is a `c-vas-sidebar`
feature, wired up the same way every other feature (e.g. HTML validation) already is — whether it
(and the rest of the sidebar) reaches a production bundle depends on how you guard your own use of
`c-vas-sidebar`, not on this plugin.

## Why this step is needed

Without the plugin, x-ray mode falls back to reading Vue's internal `__vueParentComponent`
reference, which only ever reflects the single deepest component sharing a given DOM node. That
breaks down in two common cases:

- **Wrapping a component without adding a wrapping element.** If your `e-button.vue` renders
  `<v-btn>` (or any other library component) as its template root with no extra `<div>`, both
  components share the exact same root DOM element, and Vue's internal reference only remembers
  the innermost one — you'd see `VBtn` instead of `e-button`.
- **Generic containers.** Hovering something whose nearest *real* component genuinely is a
  structural wrapper (a layout `Section`, a `VCol`) will show that wrapper, not a more
  "interesting" ancestor several DOM levels further up — because that ancestor is a different DOM
  node entirely, not something a single-node lookup can see.

The plugin fixes this by registering a global [mixin](https://vuejs.org/guide/reusability/composables.html)
that marks every component's root DOM element with its own name and source file as it mounts.
Because it's a *global* mixin, it applies to every component the app creates — including
third-party ones (Vuetify, PrimeVue, etc.), since they're mounted by the same app instance. That
gives x-ray mode an accurate marker at every real component boundary, letting it build a clean,
component-only ancestor chain instead of guessing from a single undocumented internal.

## Navigating the ancestor chain

Once the plugin is installed, hovering an element resolves its full chain of marked ancestors —
skipping every plain DOM node in between (divs, spans, layout wrappers with no component of their
own). While hovering:

- **Alt + ↑** — select the parent component (step outward).
- **Alt + ↓** — select the child component again (step back inward).

The label shows a `2/5`-style counter whenever there's more than one component to step through.
Clicking always copies whichever entry is currently selected.

## Limitations

- `__file` (used for the source path) is only available in dev builds and is an absolute
  filesystem path — it's trimmed to start at the last `/src/` segment as a best-effort guess at a
  project-relative path. This won't be accurate for projects that don't root their source in a
  `src/` folder.
- Components with no resolvable name at all (no explicit `name`, and no compiler-injected
  `__name` — effectively only hand-written, non-SFC render functions) can't be identified and are
  skipped.
