# HTML validation

HTML validation is a CSS-only linter for markup and ARIA mistakes, built into the styleguide
sidebar's Features panel. It's on by default.

Toggle it via the "HTML validation" switch in the Features panel. When enabled, it adds the class
`c-vas-html-validation--enabled` to the sidebar root, which activates a set of SCSS selectors that
visually flag common markup problems anywhere on the page: a red outline around the offending
element plus a tooltip-style message explaining the issue.

## What it catches

- `<button>` nested inside an `<a>`.
- An empty `<button>` with no `aria-label`/`aria-labelledby`.
- A block-level element (`<div>`, a heading, `<label>`) placed directly inside a `<button>`.
- `<label>` containing more than one focusable control (or a duplicated label value).
- A block-level element placed directly inside a `<label>`.
- `<img sizes="...">` starting with an empty source size.
- `<picture>` with `width`/`height` set on the `<picture>` element itself instead of its `<img>`.
- An `<img>` used without a `<source>` sibling that's missing `width`/`height`.
- A child of `<table>` that isn't `<tr>`, `<thead>`, `<tbody>`, or `<tfoot>`.
- A child of `<tr>` that isn't `<td>`/`<th>`.
- A `<div>` placed directly inside a `<span>`.
- A child of `<ul>` that isn't `<li>`.

## Notes

- This is a heuristic, CSS-only check — it catches common mistakes, not the full HTML/ARIA spec.
  Use it as a fast, always-visible nudge during development, not a replacement for a proper
  accessibility audit.
- The toggle state is persisted to `localStorage` (`vas-html-validation`), so it stays off/on
  across reloads per browser.
- Like every sidebar feature, this only ever ships in your bundle if you don't guard your own
  usage of `c-vas-sidebar` behind `import.meta.env.DEV` — see [Installation](/guide/installation).
