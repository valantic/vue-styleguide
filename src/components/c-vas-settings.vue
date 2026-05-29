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
      <c-vas-typography
        variant="heading"
        text="Font size"
      />
      <e-vas-select
        name="font-size"
        :model-value="String(settingsStore.state.fontSize)"
        :options="fontSizeOptions"
        :placeholder="false"
        @update:model-value="settingsStore.setFontSize(Number($event))"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasSelect from '../elements/e-vas-select.vue';
  import eVasThemeSelector from '../elements/e-vas-theme-selector.vue';
  import type { VasSettingsStore } from '../stores/settings';
  import { useVasSettingsStore } from '../stores/settings';
  import cVasTypography from './c-vas-typography.vue';

  type Setup = {
    settingsStore: VasSettingsStore;
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
    // data(): Data {
    //   return {};
    // },

    computed: {
      fontSizeOptions(): { value: string; label: string }[] {
        return [10, 11, 12, 13, 14, 15, 16].map((size) => ({ value: String(size), label: `${size}px` }));
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
