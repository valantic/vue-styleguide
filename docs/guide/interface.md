# Sidebar interface

The sidebar has one icon bar on each side of a central content pane. Every icon switches which
panel is shown in that pane (except the ones described as "action" buttons below, which don't).

## Left icon bar

- **Navigation** (folder icon) — the searchable page menu, including Favorites and Last Opened.
  See [Demo pages](/guide/demo-pages).
- **Global Configuration** (icon) — persistent-data management and, if you provided one, your
  global `#customSettings` slot. See [Custom settings](/guide/custom-settings) and
  [Local storage](/guide/settings#local-storage).
- **Page Configuration** — only enabled (and highlighted) when the current demo page provides a
  `#pageConfig` slot via `l-vas-layout`. See [Custom settings](/guide/custom-settings#per-page-settings-pageconfig).
- **Viewport indicator** — shows the current breakpoint (e.g. `md`); hover it for the exact pixel
  width/height. Updates live on window resize.
- **Hotkeys** (bottom of the left bar) — opens a modal listing every keyboard shortcut. See
  [Hotkeys](/guide/hotkeys).

## Right icon bar

- **AI** (sparkle icon) — introduces the `vue-styleguide-demo-page` Claude Code skill and links to
  its setup guide. See [AI skill](/guide/ai-skill).
- **Features** (star icon) — toggles for X-ray mode and HTML validation. See
  [X-ray mode](/features/x-ray-mode) and [HTML validation](/features/html-validation).
- **Report a Bug / Issue** (bug icon) — opens this project's GitHub issues page in a new tab.

## Top bar

- **Settings** (cog icon) — theme and font size. See [Settings](/guide/settings).

## Footer bar

- **Tips** — a rotating tip shown in the bottom-left corner.
- **Update notification** — the current installed version, linked to its GitHub release/tag page.
  If a newer tag exists on GitHub, the icon is highlighted with a badge and a tooltip showing the
  latest version — a quick way to notice you're behind without leaving your project. The check
  runs once, on mount, against the GitHub tags API for this repository; if it fails (offline, rate
  limited, etc.) it fails silently and no update is shown.

## Opening and closing the sidebar

Double-tap `Shift`, or press `Ctrl/⌘ + Shift + O`, to toggle the sidebar. `Escape` closes it (and
turns off X-ray mode if it was on). See the full list in [Hotkeys](/guide/hotkeys).
