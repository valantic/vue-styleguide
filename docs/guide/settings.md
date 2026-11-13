# Settings

Open the cog icon in the top bar to reach the Settings panel: theme and font size for the sidebar
itself (not your consuming app), plus how demo cards present themes.

## Theme

Three options: `System`, `Light`, `Dark`. `System` follows the OS/browser color-scheme preference;
the other two force a theme regardless of it. This only affects the sidebar's own UI.

## Font size

A `10`–`16` px range (default `13`), used for the sidebar's own UI text.

## Demo card themes

Sets the default of every [demo card](/guide/demo-card#theme-mode): `Light, with dark mode toggle`
or `Light and dark side by side`. `Project default` removes the setting, so cards follow the mode
provided via `vasDemoThemeModeKey` (or the toggle mode if none). The setting beats the provided
default; a card's own `theme-mode` prop beats both. Consumer settings components can change it with
`useVasSettingsStore().setDemoThemeMode(mode)` (`null` resets it).

## Local storage

All settings persist to `localStorage`, alongside every other sidebar preference. All sidebar
`localStorage` keys are prefixed with `vas-`:

| Key | Stores |
|---|---|
| `vas-theme` | Selected theme (`system` / `light` / `dark`) |
| `vas-fontSize` | Selected font size |
| `vas-demo-theme-mode` | Selected demo card theme mode (`toggle` / `compare`, `null` = project default) |
| `vas-x-ray-mode` | Whether [X-ray mode](/features/x-ray-mode) is enabled |
| `vas-html-validation` | Whether [HTML validation](/features/html-validation) is enabled |

The Global Configuration panel (the icon below Navigation in the left bar) shows how many items
and how much storage the sidebar currently has persisted, with a button to clear all of it at
once — useful if the sidebar ends up in a state you want to reset from scratch.
