# Project Context: @valantic/vue-styleguide

## 🎯 Purpose
This is a pluggable DX utility. It is NOT a standalone app. It is a toolbelt that other projects "wear" during development to navigate test pages and toggle configurations (themes, languages, auth).

## 🧩 Integration Logic
- **Interface:** The primary entry point is `c-vas-sidebar.vue`.
- **Communication:** It uses a "Props In, Events Out" pattern. The Host Project passes available options (themes, etc.) as props, and the sidebar emits events when the user interacts with them.
- **Discovery:** It relies on `vue-router` to discover pages in the host project dynamically.

## ⚠️ Development Rule
When adding features, ask: "Is this feature generic enough to work in ANY host project?"
Example: Don't hardcode a 'Dark Mode' toggle. Instead, improve the 'Theme Selector' component so it can handle any theme ID passed to it.
