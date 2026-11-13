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
| `bare` | `Boolean` | `false` | For components that bring their own layout (gutters, max-width, headline): removes the padding, max-width, borders and headline in one go. Wins over `padding`, `variant` and `showHeadline`. |

```vue
<l-vas-layout bare>
  <my-page-layout-component />
</l-vas-layout>
```

### Client gutter, max-width and sticky header

Client projects rarely share the styleguide's default frame. To test primitive components (buttons, inputs, …) in
the client's real gutter and content width, set these CSS custom properties once in the project's global CSS:

| Custom property | Default | Purpose |
|---|---|---|
| `--vas-layout-max-width` | `lg` breakpoint | Content max-width of the `default` variant. |
| `--vas-layout-gutter` | spacing 30 | Content padding of `padding="default"`. |
| `--vas-layout-offset-top` | `0` | Space above the layout, e.g. the height of a fixed/sticky header. |

```scss
:root {
  --vas-layout-max-width: 1440px;
  --vas-layout-gutter: 24px;
  --vas-layout-offset-top: 80px;
}
```

`bare` ignores max-width and gutter (the component owns them) but still applies the top offset.

## `l-vas-layout` alone vs. `c-vas-demo-card`

`#pageConfig` is for page-wide scenario toggles on an organism or full page (e.g. "many items in
the cart", a missing permission, a loading/empty/error state) — those pages should use
`l-vas-layout` alone, not `c-vas-demo-card`, which is sized and styled for a single small
component. See [Demo page patterns](/guide/demo-page-patterns) for the full decision rule.
