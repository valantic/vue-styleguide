# Production safety

This package ships raw, uncompiled source: `package.json`'s `main`/`module`/`exports` point
straight at `src/index.ts`, so there is no separate build/`dist/` step for npm distribution. A
consuming project's own Vite/Rollup build processes these files exactly like first-party source —
whatever survives _that_ build's tree-shaking ends up in the consumer's bundle.

## Why there's no built-in `DEV` guard

`c-vas-sidebar` and every feature registered under it (e.g. `c-vas-html-validation`,
`c-vas-x-ray-mode`) are wired together via ordinary static imports. Nothing in this package gates
itself behind `import.meta.env.DEV` — there is no bundling boundary inside the package where such
a check could strip anything out. `import.meta.env.DEV` only has an effect at the point where a
module is _requested_: if nothing ever imports the sidebar, tree-shaking can drop it, but nothing
here refuses to be imported, so an internal guard wouldn't change what a bundler decides to keep.

Keeping this package out of a production build is therefore the **consuming project's**
responsibility — see [Setup](/guide/setup#guard-it-behind-dev-mode) for the guard to add around
your own usage of `c-vas-sidebar`, ideally a dynamic `import()` rather than relying on
tree-shaking alone. [X-ray mode](/features/x-ray-mode#setup-recommended) has a worked example of
the same pattern for `vasXRayInspector`, the plugin that improves x-ray mode's accuracy.

## Contributing here

Don't add a `DEV`/production guard inside a component or feature in this package "just to be
safe". It wouldn't change what ships (there's no bundling boundary at that point to act on), and
it contradicts the architecture described above. That responsibility always belongs in the
consumer's app entry, never inside this package.
