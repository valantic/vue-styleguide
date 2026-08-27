# Setup

## Guard it behind DEV mode

Production safety is the consuming project's responsibility. `c-vas-sidebar` and every feature
registered under it are wired together via ordinary static imports — nothing in this package
gates itself behind `import.meta.env.DEV`. Guard your own usage, ideally via a dynamic `import()`
for a stronger guarantee than relying on tree-shaking alone:

```ts
if (import.meta.env.DEV) {
  const { cVasSidebar } = await import('@valantic/vue-styleguide');

  app.component('c-vas-sidebar', cVasSidebar);
}
```

## Minimal example

Include the sidebar in your project's styleguide entry component. This is the minimum setup:

<<< @/setup-examples/styleguide-mvp.vue

## Advanced example

In case you want to place global settings (e.g. login state, locale, theme) in the sidebar, here
is a more real-life scenario using the `#customSettings` slot:

<<< @/setup-examples/styleguide-advanced.vue

## Next steps

- See [Demo pages](/guide/demo-pages) for the built-in Favorites, Last Opened and README demo page.
- See [Sidebar interface](/guide/interface) for a tour of every icon in the sidebar.
- See [Custom settings](/guide/custom-settings) for the per-page `#pageConfig` slot, and
  [Demo card](/guide/demo-card) for a ready-made component showcase frame.
