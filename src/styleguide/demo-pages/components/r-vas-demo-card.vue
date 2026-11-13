<template>
  <l-vas-layout>
    <template #pageConfig>
      <e-vas-toggle
        v-model="forceConfigurationTop"
        label="Force configuration on top"
      />
      <e-vas-toggle
        v-model="singleTheme"
        label="Single theme"
      />
      <e-vas-toggle
        v-model="compareThemes"
        label="Compare themes"
      />
    </template>
    <div :class="b()">
      <section :class="b('section')">
        <h2>Playground</h2>
        <p>Driven by the page config in the sidebar flyout.</p>
        <c-vas-demo-card
          :force-configuration-top="forceConfigurationTop"
          :single-theme="singleTheme"
          :theme-mode="themeMode"
        >
          <template #header> Demo Card Header </template>
          <template #demo>
            <e-vas-button primary>Action</e-vas-button>
          </template>
          <template #sidebar> Sidebar info </template>
        </c-vas-demo-card>
      </section>

      <section :class="b('section')">
        <h2>Global mode</h2>
        <p>
          No <code>theme-mode</code> prop: follows the globally provided mode. This styleguide provides
          <code>compare</code>, so both themes are shown.
        </p>
        <c-vas-demo-card>
          <template #header> Inherits the global mode </template>
          <template #demo>
            <e-vas-button primary>Action</e-vas-button>
          </template>
        </c-vas-demo-card>
      </section>

      <section :class="b('section')">
        <h2>theme-mode="toggle"</h2>
        <p>Overrides the global mode: light by default, the header toggle switches to dark.</p>
        <c-vas-demo-card theme-mode="toggle">
          <template #header> Toggle </template>
          <template #demo>
            <e-vas-button primary>Action</e-vas-button>
          </template>
        </c-vas-demo-card>
      </section>

      <section :class="b('section')">
        <h2>theme-mode="compare"</h2>
        <p>Light and dark side by side, no toggle.</p>
        <c-vas-demo-card theme-mode="compare">
          <template #header> Compare </template>
          <template #demo>
            <e-vas-button primary>Action</e-vas-button>
          </template>
        </c-vas-demo-card>
      </section>

      <section :class="b('section')">
        <h2>single-theme</h2>
        <p>Light only, no toggle, whatever the mode.</p>
        <c-vas-demo-card single-theme>
          <template #header> Single theme </template>
          <template #demo>
            <e-vas-button primary>Action</e-vas-button>
          </template>
        </c-vas-demo-card>
      </section>

      <section :class="b('section')">
        <h2>Shared state and radio groups</h2>
        <p>The sidebar controls drive every rendered pane; the radios must not deselect each other across panes.</p>
        <c-vas-demo-card theme-mode="compare">
          <template #header> Compare with state </template>
          <template #demo>
            <e-vas-button
              :disabled="disabled"
              primary
            >
              Action
            </e-vas-button>
            <e-vas-radio
              v-model="radio"
              name="demo-card-radio"
              value="a"
              label="A"
            />
            <e-vas-radio
              v-model="radio"
              name="demo-card-radio"
              value="b"
              label="B"
            />
          </template>
          <template #sidebar>
            <e-vas-toggle
              v-model="disabled"
              label="Disabled"
            />
          </template>
        </c-vas-demo-card>
        <c-vas-demo-card theme-mode="toggle">
          <template #header> Toggle with state (state survives toggling) </template>
          <template #demo>
            <e-vas-button
              :disabled="disabled"
              primary
            >
              Action
            </e-vas-button>
            <e-vas-radio
              v-model="radio"
              name="demo-card-radio-toggle"
              value="a"
              label="A"
            />
            <e-vas-radio
              v-model="radio"
              name="demo-card-radio-toggle"
              value="b"
              label="B"
            />
          </template>
          <template #sidebar>
            <e-vas-toggle
              v-model="disabled"
              label="Disabled"
            />
          </template>
        </c-vas-demo-card>
      </section>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasButton from '../../../elements/e-vas-button.vue';
  import eVasRadio from '../../../elements/e-vas-radio.vue';
  import eVasToggle from '../../../elements/e-vas-toggle.vue';
  import cVasDemoCard from '../../../features/c-vas-demo-card.vue';
  import { DemoThemeMode } from '../../../features/demo-theme-mode';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    forceConfigurationTop: boolean;
    singleTheme: boolean;
    compareThemes: boolean;
    disabled: boolean;
    radio: string;
  };

  /**
   * Styleguide page for c-vas-demo-card.
   */
  export default defineComponent({
    name: 'r-vas-demo-card',

    components: {
      eVasToggle,
      cVasDemoCard,
      eVasButton,
      eVasRadio,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        forceConfigurationTop: false,
        singleTheme: false,
        compareThemes: false,
        disabled: false,
        radio: 'a',
      };
    },

    computed: {
      themeMode(): DemoThemeMode {
        return this.compareThemes ? 'compare' : 'toggle';
      },
    },
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
