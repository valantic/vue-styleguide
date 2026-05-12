# valantic vue styleguide

## unreleased

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
