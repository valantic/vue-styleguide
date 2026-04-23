# valantic - vue styleguide

> A pluggable Developer Experience (DX) utility for Vue 3 projects.

This library provides a standardized, interactive sidebar designed to be integrated into any Vue 3 project during development. It acts as a "testing harness," allowing developers to quickly navigate test/demo pages and manipulate global application states (like themes and languages) through a unified interface.

#### Config sidebar `c-vas-sidebar`

- Searchable menu for all test pages
- Config section to change eg. the language or theme

#### Config sidebar `l-vas-layout`

- Demo wrapper for pages and components.

Roadmap:

- Better documentation.
- More config possibilities for a certain feature or page.
- Slots in `l-vas-layout` for common used things like documentation link or description.

## Introduction

### How to use:

This lib is part of the [vue-template](https://github.com/valantic/vue-template) project. Check this page for a more complex usage.

#### Install via npm

To reduce dev overhead it is currently only installable by a github link. Add this to your package.json

Find available versions here: [https://github.com/valantic/vue-styleguide/tags](https://github.com/valantic/vue-styleguide/tags)

```
  "devDependencies": {
    "@valantic/vue-styleguide": "github:valantic/vue-styleguide#v1.2.0",
  }
```

#### Include it in the test section of your project:

See [https://github.com/valantic/vue-template/blob/main/src/styleguide/styleguide.vue](https://github.com/valantic/vue-template/blob/main/src/styleguide/styleguide.vue)

Include the sidebar in your project. This is the minimum example:

[https://github.com/valantic/vue-styleguide/blob/main/docs/setup-examples/styleguide-mvp.vue](https://github.com/valantic/vue-styleguide/blob/main/docs/setup-examples/styleguide-mvp.vue)

##### More advanced example

In case you want to place global settings here is a more real life scenario

[https://github.com/valantic/vue-styleguide/blob/main/docs/setup-examples/styleguide-advanced.vue](https://github.com/valantic/vue-styleguide/blob/main/docs/setup-examples/styleguide-advanced.vue)


## Predefined demo pages

### Favorites

You can mark any route as a favorite to group it at the top of the navigation. To do so, add `favorite: true` to the route's `meta` object:

```ts
{
  path: 'my-page',
  name: 'my-page',
  component: () => import('./MyPage.vue'),
  meta: {
    title: 'My Page',
    favorite: true,
  },
}
```

### Readme

Import a default demo page to display the projects README.md file.

In your `styleguide/setup/routes.ts` you can add:

```ts
import { styleguideRouterConfig, styleguideTestPages } from '@valantic/vue-styleguide';

export default [
  {
    path: styleguideRouterConfig.rootPath,
    name: 'sg-root',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    redirect: `${styleguideRouterConfig.rootPath}/${styleguideTestPages.readme.path}`,
    meta: {
      title: 'Styleguide',
    },
    children: [styleguideTestPages.readme],
  },
]
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, valantic CEC Schweiz AG
