<template>
  <l-vas-layout :class="b()">
    <div :class="b('intro')">
      <p :class="b('intro-text')">
        A compact developer sidebar for Vue 3 projects. Loaded only in dev mode — providing navigation, config toggles,
        and component demo infrastructure alongside your application.
      </p>
    </div>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Design Principles</h2>
      <div :class="b('principles')">
        <div
          v-for="principle in principles"
          :key="principle.name"
          :class="b('principle')"
        >
          <div :class="b('principle-name')">{{ principle.name }}</div>
          <div :class="b('principle-desc')">{{ principle.description }}</div>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Layer Architecture</h2>
      <div :class="b('layers')">
        <div
          v-for="layer in layers"
          :key="layer.prefix"
          :class="b('layer')"
        >
          <code :class="b('layer-prefix')">{{ layer.prefix }}</code>
          <div :class="b('layer-info')">
            <div :class="b('layer-name')">{{ layer.name }}</div>
            <div :class="b('layer-desc')">{{ layer.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Naming Conventions</h2>
      <div :class="b('conventions')">
        <div
          v-for="convention in conventions"
          :key="convention.prefix"
          :class="b('convention')"
        >
          <code :class="b('convention-prefix')">{{ convention.prefix }}</code>
          <span :class="b('convention-desc')">{{ convention.description }}</span>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Theming</h2>
      <div :class="b('theme-info')">
        <p :class="b('theme-text')">
          Two themes are provided: <code>light</code> and <code>dark</code>. All color values are expressed as CSS
          custom properties scoped to <code>.vas-styleguide-theme-light</code> /
          <code>.vas-styleguide-theme-dark</code>. Static SCSS variables are reserved for spacing, typography, and
          breakpoints.
        </p>
        <div :class="b('theme-props')">
          <div
            v-for="prop in themeProps"
            :key="prop"
            :class="b('theme-prop')"
          >
            <code>{{ prop }}</code>
          </div>
        </div>
      </div>
    </section>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Principle = { name: string; description: string };
  type Layer = { prefix: string; name: string; description: string };
  type Convention = { prefix: string; description: string };
  type Data = {
    principles: Principle[];
    layers: Layer[];
    conventions: Convention[];
    themeProps: string[];
  };

  export default defineComponent({
    name: 'r-concept',

    components: {
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        principles: [
          {
            name: 'Dense',
            description:
              'Tight spacing and compact type. Developers need to see information at a glance — whitespace is earned, not given.',
          },
          {
            name: 'Neutral-first',
            description:
              'Grayscale dominates the interface. The Valantic brand color (#FF5D4C) is a precision accent used only for interactive states and primary actions.',
          },
          {
            name: 'Token-explicit',
            description:
              'Every visual value — color, spacing, type size — maps to a named SCSS variable. Tokens are the source of truth; arbitrary values are not permitted.',
          },
          {
            name: 'Dark-first',
            description:
              'The dark theme is treated as first-class, not an afterthought. Backgrounds follow VS Code conventions: surface darker than content, with controlled contrast.',
          },
          {
            name: 'System-aware',
            description:
              "UI text uses Arial (system-stack). Token names and code values render in the browser's default monospace family — no web fonts are loaded.",
          },
        ],
        layers: [
          {
            prefix: 'e-vas-*',
            name: 'Elements',
            description:
              'Atomic UI primitives: button, input, checkbox, icon. No child components — only HTML and styles.',
          },
          {
            prefix: 'c-vas-*',
            name: 'Components',
            description: 'Composite blocks that combine elements: sidebar, flyout, modal, navigation, demo card.',
          },
          {
            prefix: 'l-vas-*',
            name: 'Layouts',
            description: 'Structural wrappers that define regions and page scaffolding for demo views.',
          },
          {
            prefix: 'r-*',
            name: 'Route pages',
            description:
              'Demo and documentation views. Registered as Vue Router children under /sg. Not exported from the library.',
          },
        ],
        conventions: [
          { prefix: 'c-vas-*', description: 'Components — composite UI blocks' },
          { prefix: 'e-vas-*', description: 'Elements — atomic UI primitives (button, input, icon)' },
          { prefix: 'l-vas-*', description: 'Layouts — structural wrappers' },
          { prefix: 'r-*', description: 'Route pages — demo and documentation views' },
          { prefix: '$vas-*', description: 'SCSS variables — all design tokens are prefixed' },
          { prefix: '--vas-theme-*', description: 'CSS custom properties — all theme values are prefixed' },
        ],
        themeProps: [
          '--vas-theme-text-color',
          '--vas-theme-text-color-muted',
          '--vas-theme-text-color-highlight',
          '--vas-theme-border-color',
          '--vas-theme-background-content',
          '--vas-theme-background-surface',
          '--vas-theme-background-surface-hover',
          '--vas-theme-background-container',
          '--vas-theme-overlay',
          '--vas-theme-button-bg',
          '--vas-theme-button-bg-hover',
          '--vas-theme-highlight',
        ],
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../../../setup/scss/variables';

  .r-concept {
    &__intro {
      margin-bottom: variables.$vas-spacing--24;
      padding: variables.$vas-spacing--16;
      border-left: 3px solid variables.$vas-color-valantic-primary;
      background-color: var(--vas-theme-background-surface);
    }

    &__intro-text {
      margin: 0;
      font-size: variables.$vas-font-size--label;
      line-height: 1.6;
      color: var(--vas-theme-text-color);
    }

    &__section {
      margin-bottom: variables.$vas-spacing--30;
    }

    &__section-title {
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--vas-theme-text-color-muted);
      margin-bottom: variables.$vas-spacing--12;
      padding-bottom: variables.$vas-spacing--8;
      border-bottom: 1px solid var(--vas-theme-border-color);
    }

    &__principles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: variables.$vas-spacing--8;
    }

    &__principle {
      padding: variables.$vas-spacing--12;
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
    }

    &__principle-name {
      font-size: variables.$vas-font-size--label;
      font-weight: variables.$vas-font-weight--bold;
      margin-bottom: variables.$vas-spacing--6;
      color: var(--vas-theme-text-color-highlight);
    }

    &__principle-desc {
      font-size: variables.$vas-font-size--base;
      line-height: 1.5;
      color: var(--vas-theme-text-color-muted);
    }

    &__layers {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--2;
    }

    &__layer {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: variables.$vas-spacing--16;
      align-items: start;
      padding: variables.$vas-spacing--10 variables.$vas-spacing--12;
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
    }

    &__layer-prefix {
      font-family: monospace;
      font-size: variables.$vas-font-size--small;
      color: variables.$vas-color-valantic-primary;
      padding: variables.$vas-spacing--2 variables.$vas-spacing--6;
      background-color: var(--vas-theme-highlight);
      border-radius: 2px;
      white-space: nowrap;
    }

    &__layer-name {
      font-size: variables.$vas-font-size--label;
      font-weight: variables.$vas-font-weight--semi-bold;
      color: var(--vas-theme-text-color-highlight);
      margin-bottom: variables.$vas-spacing--4;
    }

    &__layer-desc {
      font-size: variables.$vas-font-size--base;
      color: var(--vas-theme-text-color-muted);
      line-height: 1.5;
    }

    &__conventions {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--2;
    }

    &__convention {
      display: flex;
      align-items: center;
      gap: variables.$vas-spacing--16;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--12;
      border-bottom: 1px solid var(--vas-theme-border-color);

      &:last-child {
        border-bottom: none;
      }
    }

    &__convention-prefix {
      font-family: monospace;
      font-size: variables.$vas-font-size--small;
      color: variables.$vas-color-valantic-primary;
      white-space: nowrap;
      min-width: 160px;
    }

    &__convention-desc {
      font-size: variables.$vas-font-size--base;
      color: var(--vas-theme-text-color-muted);
    }

    &__theme-text {
      font-size: variables.$vas-font-size--base;
      line-height: 1.6;
      color: var(--vas-theme-text-color);
      margin-bottom: variables.$vas-spacing--12;

      code {
        font-family: monospace;
        font-size: variables.$vas-font-size--small;
        padding: 1px variables.$vas-spacing--4;
        background-color: var(--vas-theme-highlight);
        border-radius: 2px;
      }
    }

    &__theme-props {
      display: flex;
      flex-wrap: wrap;
      gap: variables.$vas-spacing--6;
    }

    &__theme-prop {
      code {
        font-family: monospace;
        font-size: variables.$vas-font-size--tiny;
        padding: variables.$vas-spacing--2 variables.$vas-spacing--8;
        background-color: var(--vas-theme-background-surface);
        border: 1px solid var(--vas-theme-border-color);
        border-radius: 2px;
        color: var(--vas-theme-text-color-muted);
        white-space: nowrap;
      }
    }
  }
</style>
