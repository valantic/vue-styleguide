# valantic vue styleguide

## unreleased

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
