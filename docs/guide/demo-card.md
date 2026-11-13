# Demo card

`c-vas-demo-card` is a ready-made frame for showcasing a single component on a demo page: a
header, a demo area, and a "Configuration" sidebar area — laid out side by side on wider
viewports, stacked on narrow ones.

The `#demo` slot is rendered on the **light theme by default**. A "Dark mode" toggle at the right of the header switches
it to the dark theme and back on demand, so a styling change can be checked on every theme without
switching the sidebar theme. The selection is local to each card. Alternatively the card can
[compare](#theme-mode) light and dark side by side.

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
| `demo` | The actual component/example being demonstrated. Rendered once, on the selected theme (see `singleTheme`). |
| `sidebar` | The "Configuration" area — controls that drive the props/state of what's in `#demo`. Rendered once. |

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `forceConfigurationTop` | `Boolean` | `false` | Places the `#sidebar` area above `#demo` instead of beside it, on all viewport sizes. Useful when the configuration controls need more horizontal room than the side layout allows. |
| `themeMode` | `'toggle' \| 'compare'` | stored setting, else global mode, else `'toggle'` | `toggle`: one pane with the "Dark mode" toggle. `compare`: light and dark pane side by side, no toggle. Overrides the stored setting and the global mode for this card. |
| `singleTheme` | `Boolean` | `false` | Renders `#demo` on the light theme only, without the "Dark mode" toggle. Use it for demos that bring their own theming. |

## Theme mode

| Mode | Result |
|---|---|
| `toggle` (default) | One pane on the light theme. The "Dark mode" toggle in the header switches it to dark. |
| `compare` | A light and a dark pane next to each other. No toggle. |

The pane carries the `vas-styleguide-theme-light` / `vas-styleguide-theme-dark` class, so every
`--vas-theme-*` custom property inside `#demo` resolves for that theme. In `toggle` mode the slot
is never duplicated: the demo keeps its state and only its theme changes.

In `compare` mode the slot is rendered twice, so a component in `#demo` is instantiated twice and
side effects in the demo run twice (both copies are bound to the same state, so the `#sidebar`
controls drive both panes). Each pane is a `<form>` (its `submit` is prevented) so radio groups
sharing a `name` across the panes don't deselect each other. Use `singleTheme` when the demo must
exist only once.

### Set the mode globally

Provide `vasDemoThemeModeKey` on the app (or any ancestor) to change the default of every card
below it:

```ts
import { vasDemoThemeModeKey } from '@valantic/vue-styleguide/features';

app.provide(vasDemoThemeModeKey, 'compare');
```

### Set the mode in the settings

The sidebar's [Settings](/guide/settings#demo-card-themes) panel has a "Demo card themes" select. Its stored
value wins over the provided default, so a dev can switch every card on demand. Custom settings
components can call `useVasSettingsStore().setDemoThemeMode('compare' | 'toggle' | null)`.

### Mix per card

The `themeMode` prop wins over the provided default and the stored setting, so a single card can deviate either way:

```vue
<c-vas-demo-card theme-mode="toggle">…</c-vas-demo-card>
<c-vas-demo-card theme-mode="compare">…</c-vas-demo-card>
```

This styleguide's own demo app provides `compare` as default, because it documents the components. A dev
can still change it in the settings.

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
