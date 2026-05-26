<template>
  <l-vas-layout :class="b()">
    <div :class="b('intro')">
      <p :class="b('intro-text')">
        <code>@valantic/vue-styleguide</code> is a developer experience utility for Vue 3 projects. It renders a
        collapsible sidebar in your running application — available only in dev mode — giving your team a live,
        navigable component reference without leaving the browser.
      </p>
    </div>

    <section :class="b('section')">
      <h2 :class="b('section-title')">What it provides</h2>
      <div :class="b('features')">
        <div
          v-for="feature in features"
          :key="feature.name"
          :class="b('feature')"
        >
          <div :class="b('feature-name')">{{ feature.name }}</div>
          <div :class="b('feature-desc')">{{ feature.description }}</div>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Quick start</h2>
      <div :class="b('steps')">
        <div
          v-for="(step, index) in steps"
          :key="step.label"
          :class="b('step')"
        >
          <div :class="b('step-number')">{{ index + 1 }}</div>
          <div :class="b('step-content')">
            <div :class="b('step-label')">{{ step.label }}</div>
            <pre
              v-if="step.code"
              :class="b('step-code')"
            ><code>{{ step.code }}</code></pre>
            <p
              v-if="step.note"
              :class="b('step-note')"
            >{{ step.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">What's in this guide</h2>
      <div :class="b('sections')">
        <div
          v-for="section in guideSections"
          :key="section.title"
          :class="b('guide-section')"
        >
          <div :class="b('guide-section-title')">{{ section.title }}</div>
          <div :class="b('guide-section-desc')">{{ section.description }}</div>
        </div>
      </div>
    </section>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import lVasLayout from '../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Feature = { name: string; description: string };
  type Step = { label: string; code?: string; note?: string };
  type GuideSection = { title: string; description: string };
  type Data = {
    features: Feature[];
    steps: Step[];
    guideSections: GuideSection[];
  };

  export default defineComponent({
    name: 'r-project-overview',

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
        features: [
          {
            name: 'Sidebar navigation',
            description:
              'A keyboard-accessible sidebar listing all demo pages, grouped by section. Toggled with a hotkey so it stays out of the way.',
          },
          {
            name: 'Per-page config panel',
            description:
              'Each demo page can expose custom controls — toggles, buttons, inputs — through a dedicated slot that teleports into the sidebar.',
          },
          {
            name: 'Demo card infrastructure',
            description:
              'The c-vas-demo-card component provides a consistent wrapper for isolated component demos with a header, demo area, and optional sidebar.',
          },
          {
            name: 'Design token reference',
            description:
              'Live color palette, spacing scale, and typography reference derived directly from the SCSS design tokens — always in sync with the source.',
          },
          {
            name: 'Dev-mode only',
            description:
              "The sidebar is never loaded in production. It is imported conditionally in main.ts using Vite's import.meta.env.DEV flag.",
          },
        ],
        steps: [
          {
            label: 'Install the package',
            code: 'npm install @valantic/vue-styleguide',
          },
          {
            label: 'Register the sidebar in your app entry',
            code: `// main.ts (inside an if (import.meta.env.DEV) block)
import { cVasSidebar, styleguideRouterConfig, styleguideTestPages } from '@valantic/vue-styleguide';
import '@valantic/vue-styleguide/dist/style.css';

app.component('cVasSidebar', cVasSidebar);`,
          },
          {
            label: 'Add the router children',
            code: `// router.ts
import { styleguideRouterConfig, styleguideTestPages } from '@valantic/vue-styleguide';

{
  path: styleguideRouterConfig.rootPath,
  component: styleguideRouterConfig.routeChildrenComponentWrapper,
  children: [
    styleguideTestPages.readme,
    // add your own demo page routes here
  ],
}`,
          },
          {
            label: 'Mount the sidebar in your root layout',
            code: `<c-vas-sidebar v-if="isDev" />`,
            note: 'The sidebar renders in a portal and does not affect your layout flow.',
          },
        ],
        guideSections: [
          {
            title: 'Design System',
            description:
              'Design principles, color palette, spacing scale, and typography. Everything is derived from SCSS variables — this section is the visual source of truth.',
          },
          {
            title: 'Elements',
            description:
              'Atomic UI primitives (e-vas-*): buttons, inputs, checkboxes, toggles, selects, and icons. No dependencies on other components.',
          },
          {
            title: 'Components',
            description:
              'Composite UI blocks (c-vas-*) built from elements: the sidebar itself, flyout, modal, navigation, and panel variants.',
          },
          {
            title: 'Features',
            description:
              'Interactive demos of DX-specific features: the demo card infrastructure, page settings panel, and persistent config — plus this project\'s README.',
          },
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
  @use '../../setup/scss/variables';

  .r-project-overview {
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

      code {
        font-family: monospace;
        font-size: variables.$vas-font-size--small;
        padding: 1px variables.$vas-spacing--4;
        background-color: var(--vas-theme-highlight);
        border-radius: 2px;
        color: variables.$vas-color-valantic-primary;
      }
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

    &__features {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: variables.$vas-spacing--8;
    }

    &__feature {
      padding: variables.$vas-spacing--12;
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
    }

    &__feature-name {
      font-size: variables.$vas-font-size--label;
      font-weight: variables.$vas-font-weight--bold;
      margin-bottom: variables.$vas-spacing--6;
      color: var(--vas-theme-text-color-highlight);
    }

    &__feature-desc {
      font-size: variables.$vas-font-size--base;
      line-height: 1.5;
      color: var(--vas-theme-text-color-muted);
    }

    &__steps {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--16;
    }

    &__step {
      display: grid;
      grid-template-columns: 28px 1fr;
      gap: variables.$vas-spacing--12;
      align-items: start;
    }

    &__step-number {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: variables.$vas-color-valantic-primary;
      color: #ffffff;
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      flex-shrink: 0;
    }

    &__step-label {
      font-size: variables.$vas-font-size--label;
      font-weight: variables.$vas-font-weight--semi-bold;
      color: var(--vas-theme-text-color-highlight);
      margin-bottom: variables.$vas-spacing--8;
    }

    &__step-code {
      margin: 0;
      padding: variables.$vas-spacing--12;
      background-color: var(--vas-theme-background-surface);
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      overflow-x: auto;

      code {
        font-family: monospace;
        font-size: variables.$vas-font-size--small;
        color: var(--vas-theme-text-color);
        white-space: pre;
      }
    }

    &__step-note {
      margin: variables.$vas-spacing--6 0 0;
      font-size: variables.$vas-font-size--base;
      color: var(--vas-theme-text-color-muted);
      font-style: italic;
    }

    &__sections {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: variables.$vas-spacing--8;
    }

    &__guide-section {
      padding: variables.$vas-spacing--12;
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
    }

    &__guide-section-title {
      font-size: variables.$vas-font-size--label;
      font-weight: variables.$vas-font-weight--bold;
      color: var(--vas-theme-text-color-highlight);
      margin-bottom: variables.$vas-spacing--6;
    }

    &__guide-section-desc {
      font-size: variables.$vas-font-size--base;
      line-height: 1.5;
      color: var(--vas-theme-text-color-muted);
    }
  }
</style>
