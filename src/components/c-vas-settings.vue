<template>
  <div :class="b()">
    <div :class="b('headline')">Appearance</div>
    <e-vas-theme-selector />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasThemeSelector from '../elements/e-vas-theme-selector.vue';

  /**
   * Component for managing global settings.
   */
  export default defineComponent({
    name: 'c-vas-settings',

    components: {
      eVasThemeSelector,
    },

    methods: {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-settings {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--10;

    &__headline {
      font-weight: bold;
      color: var(--vas-theme-text-color-muted);
      margin: variables.$vas-spacing--10 0;
    }

    &__custom-settings {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--10;
      margin-top: variables.$vas-spacing--20;
      border-top: 1px solid variables.$vas-theme-border-color;
    }
  }
</style>
