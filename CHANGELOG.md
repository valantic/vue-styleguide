# valantic vue styleguide

## unreleased

- [BUGFIX]: Fixed flaky flyout when the direction property is changed.
- [FEATURE]: Made it possible to import the readme demo page. This is a first step to make it easier to use the styleguide in other projects.
- [FEATURE]: It is now possible to press twice shift to toggle the sidebar.
- [FEATURE]: It is now possible to move between the menu items with key up and down, press enter to jump to the page.
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

## v0.0.4 - 2026-02-19

- [ENHANCEMENT]: Limit output files via npm install.
- [ENHANCEMENT]: Renamed CHANGES.md to CHANGELOG.md
- [ENHANCEMENT]: Removed all links to storybook.

## v0.0.2 - 2025-08-01

- (Bugfix): Made language selector work again.
  - See: https://github.com/valantic/vue-template/src/styleguide/styleguide.vue for an implementation Example
  - Add `availableLanguages` to the settings of the sidebar
  - Handle updates: `@update-language="onUpdateLanguage"`
- (Bugfix): Fixed sidebar scroll
- Initial: Imported vue-template
