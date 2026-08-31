# Custom settings

Two different ways to put your own controls in the sidebar: global settings that apply to your
whole app, and per-page settings that only apply while a specific demo page is open.

## Global settings (`#customSettings`)

Pass a `#customSettings` slot to `c-vas-sidebar` to render arbitrary controls in the Global
Configuration panel (the icon below Navigation in the left bar), below the persistent-data
section. Use this for app-wide state you want to flip while developing — login state, locale,
active theme of your *own* app (as opposed to the sidebar's own theme, see [Settings](/guide/settings)).

See the [advanced setup example](/guide/setup#advanced-example) for a full, working
`#customSettings` usage.

## Per-page settings (`#pageConfig`)

Pass a `#pageConfig` slot to `l-vas-layout` on an individual demo page to render controls that
only make sense for that page — e.g. props to tweak on the component being demonstrated. The
sidebar's "Page Configuration" icon is disabled and dimmed until the currently open page provides
one; as soon as it does, the icon lights up (badge + highlight) and switching to it shows your
slot content.

```vue
<template>
  <l-vas-layout>
    <template #pageConfig>
      <e-vas-toggle
        v-model="showDisabledState"
        label="Show disabled state"
      />
    </template>

    <my-component :disabled="showDisabledState" />
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { eVasToggle } from '@valantic/vue-styleguide/elements';
  import { lVasLayout } from '@valantic/vue-styleguide/layouts';
  import MyComponent from './my-component.vue';

  export default defineComponent({
    name: 'my-demo-page',

    components: {
      lVasLayout,
      eVasToggle,
      MyComponent,
    },

    data() {
      return {
        showDisabledState: false,
      };
    },
  });
</script>
```

The slot's content is teleported into the sidebar's flyout, so it's only ever rendered while that
page is mounted — leaving the page (navigating away) clears it and disables the icon again.

## `l-vas-layout` props

Besides the `#pageConfig` slot, `l-vas-layout` also accepts:

| Prop | Values | Default | Purpose |
|---|---|---|---|
| `padding` | `'default'` \| `'0'` | `'default'` | Content padding around the page body. |
| `variant` | `'default'` \| `'plain'` | `'default'` | `'default'` adds the bordered container look; `'plain'` doesn't. |
| `showHeadline` | `Boolean` | `true` | Whether to auto-render a headline from `route.meta.title` (falling back to the route name). |

## `l-vas-layout` alone vs. `c-vas-demo-card`

`#pageConfig` is for page-wide scenario toggles on an organism or full page (e.g. "many items in
the cart", a missing permission, a loading/empty/error state) — those pages should use
`l-vas-layout` alone, not `c-vas-demo-card`, which is sized and styled for a single small
component. See [Demo page patterns](/guide/demo-page-patterns) for the full decision rule.
