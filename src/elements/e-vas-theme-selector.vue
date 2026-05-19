<template>
  <div :class="b()">
    <button
      v-for="option in themeOptions"
      :key="option.value"
      :class="b('option', { active: option.value === settingsStore.state.theme })"
      type="button"
      @click="settingsStore.setTheme(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { Theme, VasSettingsStore } from '../stores/settings';
  import { THEMES, useVasSettingsStore } from '../stores/settings';

  type Setup = {
    settingsStore: VasSettingsStore;
  };

  // type Data = {};

  export default defineComponent({
    name: 'e-vas-theme-selector',

    // components: {},
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
      themeOptions(): { value: Theme; label: string }[] {
        return [...THEMES].map((value) => ({
          value,
          label: value.charAt(0).toUpperCase() + value.slice(1),
        }));
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

  .e-vas-theme-selector {
    display: flex;
    gap: variables.$vas-spacing--4;

    &__option {
      flex: 1;
      padding: variables.$vas-spacing--6 variables.$vas-spacing--8;
      border: 1px solid variables.$vas-theme-border-color;
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
      color: var(--vas-theme-text-color-muted);
      cursor: pointer;
      font-family: inherit;
      font-size: variables.$vas-font-size--small;
      transition:
        background-color variables.$vas-transition--default,
        color variables.$vas-transition--default,
        border-color variables.$vas-transition--default;

      &:hover:not(&--active) {
        background-color: var(--vas-theme-background-surface-hover);
      }

      &--active {
        background-color: var(--vas-theme-background-content);
        color: var(--vas-theme-text-color);
        border-color: var(--vas-theme-text-color-muted);
        font-weight: variables.$vas-font-weight--semi-bold;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 12%);
      }
    }
  }
</style>
