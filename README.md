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

in this example the version 0.0.2 used. Find available versions here: [https://github.com/valantic/vue-styleguide/tags](https://github.com/valantic/vue-styleguide/tags)

```
  "devDependencies": {
    "@valantic/vue-styleguide": "github:valantic/vue-styleguide#v0.0.4",
  }
```

#### Include it in the test section of your project:

See [https://github.com/valantic/vue-template/blob/main/src/styleguide/styleguide.vue](https://github.com/valantic/vue-template/blob/main/src/styleguide/styleguide.vue)

Include the sidebar in your project.

```vue3
<template>
  <c-vas-sidebar
    :settings="styleguideSettings"
    @update-theme="onUpdateTheme"
    @update-language="onUpdateLanguage"
  />
</template>

<script lang="ts">
  import cVasSidebar from '@valantic/vue-styleguide/src/components/c-vas-sidebar.vue';
  import { StyleguideSettings } from '@valantic/vue-styleguide/src/types/settings';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'app',

    components: {
      cVasSidebar,
    },

    computed: {
      styleguideSettings(): StyleguideSettings {
        return {
          themePath: 'src/setup/scss/themes',
          availableThemes: [
            {
              name: 'theme-default',
              id: 'theme-default',
              selected: true,
            },
          ],
          availableLanguages: [
            {
              label: 'English',
              value: 'en',
              selected: true,
            },
            {
              label: 'Deutsch',
              value: 'de',
            },
          ],
        };
      },
    }
  });
</script>
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, valantic CEC Schweiz AG
