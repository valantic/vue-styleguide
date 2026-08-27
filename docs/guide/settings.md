# Settings

Open the cog icon in the top bar to reach the Settings panel: theme and font size for the sidebar
itself (not your consuming app).

## Theme

Three options: `System`, `Light`, `Dark`. `System` follows the OS/browser color-scheme preference;
the other two force a theme regardless of it. This only affects the sidebar's own UI.

## Font size

A `10`–`16` px range (default `13`), used for the sidebar's own UI text.

## Local storage

Both settings persist to `localStorage`, alongside every other sidebar preference. All sidebar
`localStorage` keys are prefixed with `vas-`:

| Key | Stores |
|---|---|
| `vas-theme` | Selected theme (`system` / `light` / `dark`) |
| `vas-fontSize` | Selected font size |
| `vas-x-ray-mode` | Whether [X-ray mode](/features/x-ray-mode) is enabled |
| `vas-html-validation` | Whether [HTML validation](/features/html-validation) is enabled |

The Global Configuration panel (the icon below Navigation in the left bar) shows how many items
and how much storage the sidebar currently has persisted, with a button to clear all of it at
once — useful if the sidebar ends up in a state you want to reset from scratch.
