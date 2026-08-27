---
layout: home

hero:
  name: valantic Vue Styleguide
  text: A DX utility sidebar for Vue 3 projects
  tagline: A pluggable "testing harness" that lets you navigate demo pages and toggle global app state while you develop.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: View Demo
      link: /demo/
      target: _self
    - theme: alt
      text: GitHub
      link: https://github.com/valantic/vue-styleguide

features:
  - title: Sidebar navigation
    details: A searchable menu for all test/demo pages, with Favorites and Last Opened shortcuts.
  - title: Config panel
    details: Toggle global app state during development, e.g. language or theme, through a unified interface.
  - title: X-ray mode
    details: Hover any element to see its Vue component name and file path, click to copy them to the clipboard.
  - title: HTML validation
    details: A CSS-only linter that outlines common markup and ARIA mistakes directly on the page.
  - title: Hotkeys
    details: Open the sidebar, toggle X-ray mode and navigate menus without touching the mouse.
  - title: Custom settings
    details: Add your own global or per-page controls to the sidebar via slots.
---
