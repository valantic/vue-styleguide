# Demo card

`c-vas-demo-card` is a ready-made frame for showcasing a single component on a demo page: a
header, a demo area, and a "Configuration" sidebar area — laid out side by side on wider
viewports, stacked on narrow ones.

The `#demo` slot is rendered **once per theme**, in a light and a dark pane next to each other.
Both copies are bound to the same state, so the controls in `#sidebar` drive both panes at once
and a styling change can be checked on both themes without switching the sidebar theme.

```vue
<template>
  <c-vas-demo-card>
    <template #header>
      <h2>My component</h2>
    </template>

    <template #demo>
      <my-component :disabled="disabled" />
    </template>

    <template #sidebar>
      <e-vas-toggle
        v-model="disabled"
        label="Disabled"
      />
    </template>
  </c-vas-demo-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { cVasDemoCard } from '@valantic/vue-styleguide/features';
  import { eVasToggle } from '@valantic/vue-styleguide/elements';
  import MyComponent from './my-component.vue';

  export default defineComponent({
    name: 'my-demo-page',

    components: {
      cVasDemoCard,
      eVasToggle,
      MyComponent,
    },

    data() {
      return {
        disabled: false,
      };
    },
  });
</script>
```

## Slots

| Slot | Purpose |
|---|---|
| `header` | Card header content — typically a title and short description. Rendered once. |
| `demo` | The actual component/example being demonstrated. Rendered once per theme (see `singleTheme`). |
| `sidebar` | The "Configuration" area — controls that drive the props/state of what's in `#demo`. Rendered once. |

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `forceConfigurationTop` | `Boolean` | `false` | Places the `#sidebar` area above `#demo` instead of beside it, on all viewport sizes. Useful when the configuration controls need more horizontal room than the side layout allows. |
| `singleTheme` | `Boolean` | `false` | Renders `#demo` only once, on the light theme, instead of one pane per theme. Use it for demos that bring their own theming, or that must not exist twice on the page (e.g. anything driving a global, page-wide state). |

## Theme panes

Each pane is a `<form>` carrying the `vas-styleguide-theme-light` / `vas-styleguide-theme-dark`
class. The `<form>` is not there for submitting anything (its `submit` is prevented) — it scopes
native radio groups, so two `e-vas-radio`s sharing a `name` across the two panes don't end up in
the same browser radio group and deselect each other.

Because the slot is rendered twice, any component in `#demo` is instantiated twice. That is what
makes both panes react to the same `#sidebar` controls, but it also means side effects in the
demo run twice — reach for `singleTheme` when that matters.

## `#sidebar` vs. `#pageConfig`

`c-vas-demo-card`'s `#sidebar` slot renders its controls inline, next to the demo, on the page
itself — good for controls a visitor should see are "part of" the example. `l-vas-layout`'s
`#pageConfig` slot (see [Custom settings](/guide/custom-settings#per-page-settings-pageconfig))
renders into the sidebar flyout instead — good for controls that apply to the whole page rather
than one specific card, or that you don't want taking up on-page space. The two are independent
and can be combined on the same page: one or more `c-vas-demo-card`s with their own inline
`#sidebar` config, plus one page-wide `#pageConfig` in the surrounding `l-vas-layout`.

`c-vas-demo-card` itself is meant for a single small component, not a whole page or organism —
see [Demo page patterns](/guide/demo-page-patterns) for the full decision rule, including when to
use `l-vas-layout` alone instead.
