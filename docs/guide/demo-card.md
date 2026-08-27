# Demo card

`c-vas-demo-card` is a ready-made frame for showcasing a single component on a demo page: a
header, a demo area, and a "Configuration" sidebar area — laid out side by side on wider
viewports, stacked on narrow ones.

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
      <e-vas-toggle v-model="disabled">Disabled</e-vas-toggle>
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
| `header` | Card header content — typically a title and short description. |
| `demo` | The actual component/example being demonstrated. |
| `sidebar` | The "Configuration" area — controls that drive the props/state of what's in `#demo`. |

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `forceConfigurationTop` | `Boolean` | `false` | Places the `#sidebar` area above `#demo` instead of beside it, on all viewport sizes. Useful when the configuration controls need more horizontal room than the side layout allows. |

## `#sidebar` vs. `#pageConfig`

`c-vas-demo-card`'s `#sidebar` slot renders its controls inline, next to the demo, on the page
itself — good for controls a visitor should see are "part of" the example. `l-vas-layout`'s
`#pageConfig` slot (see [Custom settings](/guide/custom-settings#per-page-settings-pageconfig))
renders into the sidebar flyout instead — good for controls that apply to the whole page rather
than one specific card, or that you don't want taking up on-page space. The two are independent
and can be combined on the same page: one or more `c-vas-demo-card`s with their own inline
`#sidebar` config, plus one page-wide `#pageConfig` in the surrounding `l-vas-layout`.
