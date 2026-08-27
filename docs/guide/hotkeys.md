# Hotkeys

Every shortcut below is also listed live in the sidebar itself — click the keyboard icon at the
bottom of the left icon bar to open the Hotkeys modal.

| Shortcut | Mac | Action |
|---|---|---|
| `Shift`, `Shift` (double-tap) | same | Toggle the sidebar. Opens with the navigation tab preselected. |
| `Ctrl + Shift + O` | `⌘ + Shift + O` | Toggle the sidebar. Opens with the navigation tab preselected. |
| `↑` / `↓` | same | Navigate through the currently focused menu items. |
| `Enter` | same | Open the selected menu item. |
| `Esc` | same | Close the sidebar or an open modal. |
| `Ctrl + Alt + X` | `⌘ + ⌥ + X` | Toggle [X-ray mode](/features/x-ray-mode). |
| `Alt + ↑` / `Alt + ↓` | `⌥ + ↑` / `⌥ + ↓` | While X-ray mode is hovering an element, step through its component-only ancestor chain (outward / back inward). |
| `Enter` | same | While X-ray mode is hovering an element, copy the currently selected component — same as clicking it. |

## Notes

- The double-`Shift` toggle requires both presses to land within a short delay of each other; if
  it doesn't register, just try again slightly faster.
- On Mac, `Ctrl + Alt + X` is matched via `event.code === 'KeyX'` so it still works if macOS remaps
  `Option + X` to a special character.
