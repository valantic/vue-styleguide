# valantic vue styleguide

## unreleased

### Breaking Changes

- [feat] All form fields now render their own label via a new `label` property, styled after Vuetify's `filled` field variant. `e-vas-input`, `e-vas-textarea`, `e-vas-select` and `e-vas-multiselect` are therefore wrapped in a new `e-vas-field` element, which owns the filled surface, the floating label and the underline; their own blocks (`.e-vas-input`, `.e-vas-select`, …) stay on the root node but the visual styling moved to `.e-vas-field*`. **Migration:** if you styled the frame of a field with custom CSS (borders, background, padding, e.g. `.e-vas-input__field { border: … }`), re-anchor those rules to `.e-vas-field`, `.e-vas-field__control` or `.e-vas-field__outline` — the inner `__field`/`__select` elements are now transparent and borderless.
- [feat] `e-vas-radio` renders its indicator in a dedicated `.e-vas-radio__indicator` element instead of drawing it with `::before`/`::after` on `.e-vas-radio__label`, so the control also works without a label. **Migration:** replace custom CSS targeting `.e-vas-radio__label::before` / `::after` with `.e-vas-radio__indicator`.
- [feat] `e-vas-toggle` renders its label **after** the track (like Vuetify's `VSwitch`) instead of before it, and no longer stretches to the full width of its container with `justify-content: space-between`. Its `.e-vas-toggle__slider` element was replaced by `.e-vas-toggle__track` plus `.e-vas-toggle__thumb`. **Migration:** if you relied on the label-left/full-width settings-row layout or styled `.e-vas-toggle__slider`, wrap the toggle in your own flex row and re-anchor the CSS to `__track`/`__thumb`.
- [fix] `e-vas-toggle`'s `disabled` attribute now reaches the underlying `<input>` (the component sets `inheritAttrs: false` and binds `$attrs` to the control) instead of landing on the wrapping `<label>` where it had no effect. **Migration:** none needed unless you passed attributes to `e-vas-toggle` expecting them on the root `<label>` — they now apply to the `<input>`.
- [fix] `e-vas-input`'s `type` BEM modifier class now reflects the actual `type` attribute (e.g. `e-vas-input--type-number`, `e-vas-input--type-hidden`) instead of always being the broken `e-vas-input--type-true`. **Migration:** if you targeted `.e-vas-input--type-true` with custom CSS as a workaround, update the selector to the correct type-specific modifier class (e.g. `.e-vas-input--type-hidden`).

- [fix] Fix the `e-vas-multiselect` dropdown having no contrast against the surface it floats above: it painted itself with `--vas-theme-background-content`, the same token as the content behind it. Adds a `--vas-theme-background-elevated` theme token (plus the `$vas-color-slate--700` palette entry it maps to on the dark theme) for surfaces raised above the content, giving the dropdown a 1.57:1 step against the dark background while staying white on the light theme, where the border and shadow carry the separation.
- [refactor] Square off the form fields: `e-vas-field` (and with it `e-vas-input`, `e-vas-textarea`, `e-vas-select`, `e-vas-multiselect`) dropped its rounded top corners, as did the `e-vas-multiselect` dropdown, and the keyboard focus ring is now a 1px hairline at 45% of the state color instead of a full-strength 2px outline — so the animated 2px underline stays the dominant focus signal. The ring's width, offset and strength sit in `$vas-field-focus-ring-*` in `setup/scss/_form-field.scss`.
- [fix] Fix the keyboard focus ring of `e-vas-select` (and any other field with an append, e.g. `e-vas-multiselect`) only covering part of the field: the ring was drawn by the browser on the control itself, which stops where the chevron reserves its space. `e-vas-field` now suppresses the native ring on its control and draws it on the field instead, so it spans the full width.
- [feat] `c-vas-demo-card` renders its `demo` slot once per theme, in a light and a dark pane side by side, so a styling change can be checked on both themes at once. Both copies share the same state, so the controls in the `sidebar` slot drive both panes. Each pane is a (submit-prevented) `form`, which scopes native radio groups so identically named `e-vas-radio`s in the two panes don't deselect each other. The new `singleTheme` property restores the previous single-pane rendering for demos that bring their own theming or must not exist twice on the page.
- [fix] Fix `c-vas-demo-card`'s `forceConfigurationTop` property having no effect: it rendered a `c-vas-demo-card--forceConfigurationTop` class while the SCSS targeted `--force-configuration-top` (the BEM plugin runs without `hyphenate`, so camelCase modifier keys are not converted).
- [fix] Fix `e-vas-select` having no visible disabled state: it only reflected its own `progress` property into `e-vas-field`'s `disabled` state, so a plain `disabled` attribute disabled the native `<select>` but left the field looking fully interactive. It now evaluates `disabled` the same way `e-vas-input` does, matching the dimmed/`pointer-events: none` styling `e-vas-input` and `e-vas-multiselect` already had.
- [fix] Fix the low contrast of `e-vas-toggle` on the dark theme. Its track used `--vas-theme-border-color`, which only reaches 2.3:1 against the dark background, and both the "off" thumb and the "on" thumb were rendered in the exact color of the surface behind them, making them invisible. Track and thumb now use fixed grayscale values that hold up on both themes (off track 4.2:1, thumb 14:1 against the dark background) and the thumb got a hairline ring so it stays separated from the lighter "on" track.
- [feat] `e-vas-toggle` renders a check icon in its thumb while it is on and a close icon while it is off (like Vuetify's `true-icon`/`false-icon`), so the state is readable without relying on color alone. Adds the `i-check` icon to the sprite.
- [feat] Add a `label` property to all form fields (`e-vas-input`, `e-vas-textarea`, `e-vas-select`, `e-vas-multiselect`, `e-vas-checkbox`, `e-vas-radio`, `e-vas-toggle`) via the shared `withProps()` of `compositions/form-states.ts`, so consumers no longer have to wrap and restyle a `<label>` themselves. Text fields float the label out of the field once it is focused or holds a value; selection controls render it next to the control. The default slot of `e-vas-checkbox`, `e-vas-radio` and `e-vas-toggle` keeps working and takes precedence over the property.
- [feat] Add `e-vas-textarea` — a multiline text field sharing the label behaviour and styling of `e-vas-input`, with `rows`, `autoGrow` and `noResize` properties.
- [feat] Add `e-vas-field` — the shared shell (filled surface, floating label, underline) behind the text fields, exported from `@valantic/vue-styleguide/elements` and sized from `--vas-font-size-label` so the fields follow the configured sidebar font size.
- [refactor] Restyle all form fields after Vuetify's `filled` variant, scaled to the styleguide's compact type scale, and move the shared tokens/mixins into `src/setup/scss/_form-field.scss`. The checkbox indicator, the radio indicator and the switch now use theme custom properties throughout instead of fixed grayscale values, so they render correctly in the dark theme.
- [fix] Hide the placeholder of `e-vas-input`/`e-vas-textarea` while a label still sits inside the field, so the two can no longer overlap.
- [fix] `e-vas-input`'s documented `noNativeControl` property now actually hides the native spin buttons of `input[type="number"]`; it previously only added a (mis-cased) modifier class with no styling behind it.
- [refactor] Drop `e-vas-input`'s `setSlotSpacings` JavaScript measuring of its default slot — the slot content is rendered as part of the field layout now, so the padding no longer has to be calculated on mount, on `updated` and on every `resizeend`.
- [docs] Add `docs/guide/form-fields.md` documenting the `label` property, the text fields, the selection controls, the states and the sizing; update the demo-card, custom-settings and advanced setup examples to use `label` instead of hand-written wrapper labels.
- [test] Add unit tests for `e-vas-field`, `e-vas-textarea` and `e-vas-toggle`, plus label coverage (rendering, slot precedence, `for`/`aria-labelledby` wiring, float and placeholder behaviour) for `e-vas-input`, `e-vas-select`, `e-vas-multiselect`, `e-vas-checkbox` and `e-vas-radio`.
- [docs] Add a VitePress documentation site (`docs/`), deployed alongside the demo app on GitHub Pages (site at the root, demo under `/demo/`). Covers installation, sidebar setup, demo pages, the sidebar interface, hotkeys, settings, custom settings slots, the demo card, and one page per Features-panel toggle (e.g. x-ray mode, HTML validation).
- [test] Add unit tests (Vitest + `@vue/test-utils`) for all form field elements — `e-vas-input`, `e-vas-checkbox`, `e-vas-radio`, `e-vas-select`, `e-vas-multiselect` — covering `v-model` sync, emitted events, and state/disabled modifiers.
- [refactor] Project-wide cleanup to match the frontend/Vue/TypeScript style guidelines: normalized multi-line-attribute template tag formatting, replaced index-based `:key`s with stable ones and extracted a complex inline `v-if` into a computed in `c-vas-modal`, merged `import type` statements into plain imports, added explicit return types to `useVasSettingsStore`/`useVasSessionStore`, replaced `while`/classic `for` loops with recursion/`for...of` in `vue-component-inspector.ts` and `c-vas-navigation`, and replaced hardcoded hex/rgba colors with `$vas-color-*`/`$vas-shadow-color-*` SCSS variables (adding new tokens where no match existed).
- [fix] Fix `e-vas-checkbox`'s `aria-checked` always being `"true"` for group/array-based checkboxes (e.g. inside `e-vas-multiselect`) regardless of the actual selection state; it now correctly reflects whether the checkbox's `value` is present in the array `modelValue`.

## v2.1.0

- [FEATURE] Added `patch()` to the local store for partial updates to persisted objects.

## v2.0.1
 
- [BUGFIX] The control section of the flyout needs to have pointer events none to not block any user interaction in a user project.

## v2.0.0

- [FEATURE] Made font size configurable in the settings.
- [BUGFIX] Fixed import for types.
- [ENHANCEMENT] Changed navigation items to be buttons, not links to avoid unwanted style side effects.
- [ENHANCEMENT] Removed dependency of `the-new-css-reset`.
- [FEATURE] Add `c-vas-github-version` component — replaces the plain version link in the panel footer with a component that asynchronously checks the GitHub Tags API and surfaces a badge and tooltip when a newer release is available. The network request is fully fire-and-forget and never blocks rendering.
- [ENHANCEMENT] Merge `c-vas-panel-base` and `c-vas-panel-right` into a single `c-vas-panel` component, removing the intermediate layout-only shell.
- [BUGFIX] Fix `localStorage.getItem` and `clearAllPersistentItems` throwing uncaught exceptions in private-browsing mode or when storage quota is exceeded; both are now fully wrapped in try/catch.
- [BUGFIX] Fix `c-vas-modal` keydown listener never attaching when the Vue `<Transition>` is skipped (e.g. in test environments); listener is now registered in `open()` instead of the `onAfterEnter` callback. Added null guard on `$el.showModal()`.
- [BUGFIX] Fix `c-vas-flyout` direction-change timer never being cancelled on unmount, causing a potential state-update-after-unmount warning.
- [FEATURE] Add `errorCaptured` hook to `c-vas-sidebar` — child component errors are caught, logged, and contained so the sidebar never crashes the host app.
- [ENHANCEMENT] Extract `BREAKPOINTS` to `src/setup/breakpoints.ts` as the single source of truth; a new Vitest test enforces that `_variables.scss` stays in sync.
- [ENHANCEMENT] Extract magic timing constants in `c-vas-sidebar` (`DOUBLE_SHIFT_DELAY_MS`, `PAGE_CONFIG_ANIMATION_DURATION_MS`) and `c-vas-flyout` (16 ms, one frame at 60 fps) from bare numbers to named values with explanatory comments.
- [ENHANCEMENT] Add `src/utils/route-validator.ts` — emits dev-mode console warnings for routes missing a required `meta.title` or using wrong types on optional meta fields. Called once on mount in `c-vas-navigation`.
- [ENHANCEMENT] Re-enable `import/extensions` ESLint rule (`never` default, `vue: always`) to catch missing `.vue` extensions and accidental `.ts` extensions in imports.
- [ENHANCEMENT] Add JSDoc to `src/setup/options.ts` and `src/compositions/uuid.ts` explaining their purpose and constraints.
- [ENHANCEMENT] Fix pre-existing Vue Router 5 TypeScript error: add `children: []` to the root styleguide route so it satisfies `RouteRecordSingleViewWithChildren`.
- [TEST] Add test coverage for `c-vas-modal` (listener lifecycle, Escape key, outside-click), `helper.ts` (localStorage error paths), breakpoints TS↔SCSS sync, and icon type completeness.

## v1.3.0

- [ENHANCEMENT] Hovering a "Last opened" button highlights the corresponding navigation item with the selected state.
- [FEATURE] Improved navigation items.
- [BUGFIX] Fix memory leak in `e-vas-multiselect`: `onClick` listener was registered with `{ capture: true }` in `mounted` but never removed; `beforeUnmount` was removing a different listener (`handleOutsideClick`). Consolidated to a single `onDocumentClick` handler.
- [BUGFIX] Fix `v-outside-click` directive calling `.constructor()` instead of `.contains()` when a ref resolves to an array of component instances, causing exclude-ref checks to always pass.
- [BUGFIX] Fix `c-vas-modal` keydown listener accumulating on repeated open/close cycles; listeners are now deduped in `onAfterEnter` and cleaned up in `beforeUnmount`.
- [BUGFIX] Fix animation timeout in `c-vas-sidebar` not being cancelled before re-firing; stored timeout ID is now cleared in both the watcher and `beforeUnmount`.
- [BUGFIX] Remove incorrect `as RouteRecordRaw` cast in `c-vas-sidebar` route watcher; `addLastOpenedRoute` already accepts `RouteLocationNormalized`.
- [ENHANCEMENT] Remove npm audit.
- [ENHANCEMENT] Remove @ alias for path in styleguide.
- [ENHANCEMENT] Add helper and example for persisting page configuration.
- [ENHANCEMENT] Add option to force the configuration to be on top of the demo card.
- [ENHANCEMENT] Update styling of sidebar to have some fixed components.
- [FEATURE] Add "Last 5 Opened" pages to the sidebar footer.
- [FEATURE] Add the possibility to mark routes as favorite.
- [ENHANCEMENT] Split type imports and value imports.
- [ENHANCEMENT] Add the possibility to custom sort styleguide routes in the sidebar.

## v1.2.0

- [ENHANCEMENT] Add reset styles to styleguide components l-vas-layout and c-vas-sidebar.
- [ENHANCEMENT] Add hint for pages with page settings.
- [ENHANCEMENT] Remove project specific options from global settings.

## v1.1.0

- [ENHANCEMENT] Updates viewport plugin and scss media query to have no deps in a project.
- [ENHANCEMENT] Updated npm packages.

## v1.0.0

- [BUGFIX]: Fixed flaky flyout when the direction property is changed.
- [BUGFIX]: Fixed autofocus issue in input fields.
- [ENHANCEMENT]: Improved import experience for users in other projects. Make it less complicated to import components.
- [FEATURE]: Added a way to configure pages and set additional config to the main settings.
- [ENHANCEMENT]: Added test page for all elements.
- [ENHANCEMENT]: Use new components, improve hotkeys and transitions.
- [FEATURE]: Added a new component for `c-vas-demo-card`.
- [FEATURE]: Added a new component for `c-vas-demo-table`.
- [FEATURE]: Added a new element for `c-vas-flyout-toggle-button`.
- [FEATURE]: Added new generic component for `c-vas-flyout`.
- [BREAKING]:
  - replaced `StyleguideSettings` type with `StyleguideConfiguration`.
  - Introduced the `settingsStore` and refactored the settings handling.
- [ENHANCEMENT]: Added hotkey modal.
- [ENHANCEMENT]: Improved navigation block styling.
- [ENHANCEMENT]: Massive cleanup.

## v0.0.4

- [ENHANCEMENT]: Limit output files via npm install.
- [ENHANCEMENT]: Renamed CHANGES.md to CHANGELOG.md
- [ENHANCEMENT]: Removed all links to storybook.

## v0.0.2

- (Bugfix): Made language selector work again.
  - See: https://github.com/valantic/vue-template/src/styleguide/styleguide.vue for an implementation Example
  - Add `availableLanguages` to the settings of the sidebar
  - Handle updates: `@update-language="onUpdateLanguage"`
- (Bugfix): Fixed sidebar scroll
- Initial: Imported vue-template
