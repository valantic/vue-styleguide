<template>
  <div :class="b()">
    <div :class="b('section')">
      <c-vas-typography
        variant="heading"
        text="Appearance"
      />
      <e-vas-theme-selector />
    </div>

    <div :class="b('section')">
      <e-vas-select
        name="font-size"
        label="Font size"
        :model-value="String(settingsStore.state.fontSize)"
        :options="fontSizeOptions"
        :placeholder="false"
        @update:model-value="settingsStore.setFontSize(Number($event))"
      />
    </div>

    <div :class="b('section')">
      <e-vas-select
        name="demo-theme-mode"
        label="Demo card themes"
        :model-value="settingsStore.state.demoThemeMode ?? DEFAULT_OPTION_VALUE"
        :options="demoThemeModeOptions"
        :placeholder="false"
        @update:model-value="onDemoThemeModeUpdate(String($event))"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasSelect from '../elements/e-vas-select.vue';
  import eVasThemeSelector from '../elements/e-vas-theme-selector.vue';
  import { DEMO_THEME_MODES, DemoThemeMode } from '../features/demo-theme-mode';
  import { VasSettingsStore, useVasSettingsStore } from '../stores/settings';
  import cVasTypography from './c-vas-typography.vue';

  type Setup = {
    settingsStore: VasSettingsStore;
  };

  type Data = {
    DEFAULT_OPTION_VALUE: string;
  };

  const DEMO_THEME_MODE_LABELS: Record<DemoThemeMode, string> = {
    toggle: 'Light, with dark mode toggle',
    compare: 'Light and dark side by side',
  };

  /**
   * Component for managing global settings.
   */
  export default defineComponent({
    name: 'c-vas-settings',

    components: {
      eVasSelect,
      eVasThemeSelector,
      cVasTypography,
    },

    // props: {},
    // emits: {},

    setup(): Setup {
      return {
        settingsStore: useVasSettingsStore(),
      };
    },
    data(): Data {
      return {
        /**
         * Select value for "no stored setting": cards follow the provided default.
         */
        DEFAULT_OPTION_VALUE: 'default',
      };
    },

    computed: {
      fontSizeOptions(): { value: string; label: string }[] {
        return [10, 11, 12, 13, 14, 15, 16].map((size) => ({ value: String(size), label: `${size}px` }));
      },

      demoThemeModeOptions(): { value: string; label: string }[] {
        return [
          { value: this.DEFAULT_OPTION_VALUE, label: 'Project default' },
          ...DEMO_THEME_MODES.map((mode) => ({ value: mode, label: DEMO_THEME_MODE_LABELS[mode] })),
        ];
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

    methods: {
      onDemoThemeModeUpdate(value: string): void {
        this.settingsStore.setDemoThemeMode(DEMO_THEME_MODES.find((mode) => mode === value) ?? null);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-settings {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--20;

    &__section {
      gap: variables.$vas-spacing--10;
    }
  }
</style>
