# valantic - vue styleguide

> A pluggable Developer Experience (DX) utility for Vue 3 projects.

This library provides a standardized, interactive sidebar designed to be integrated into any Vue 3 project during development. It acts as a "testing harness," allowing developers to quickly navigate test/demo pages and manipulate global application states (like themes and languages) through a unified interface.

#### Config sidebar `c-vas-sidebar`

- Searchable menu for all test pages
- Config section to change eg. the language or theme

#### Config sidebar `l-vas-layout`

- Demo wrapper for pages and components.

Roadmap:

- More config possibilities for a certain feature or page.
- Slots in `l-vas-layout` for common used things like documentation link or description.

## Documentation

Full documentation — installation, setup, demo pages, x-ray mode, release process — lives at
**[valantic.github.io/vue-styleguide](https://valantic.github.io/vue-styleguide)**.

## Demo

See this project in action: [Demo-Page](https://valantic.github.io/vue-styleguide/demo/)

## Quickstart

This lib is part of the [vue-template](https://github.com/valantic/vue-template) project. Check this page for a more complex usage.

To reduce dev overhead it is currently only installable by a github link. Add this to your package.json.

Find available versions here: [https://github.com/valantic/vue-styleguide/tags](https://github.com/valantic/vue-styleguide/tags)

```
  "devDependencies": {
    "@valantic/vue-styleguide": "github:valantic/vue-styleguide#v2.1.0",
  }
```

See the [Installation](https://valantic.github.io/vue-styleguide/guide/installation) and
[Setup](https://valantic.github.io/vue-styleguide/guide/setup) guides for the full walkthrough.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, valantic CEC Schweiz AG
