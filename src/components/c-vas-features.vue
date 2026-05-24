<template>
  <div :class="b()">
    <c-vas-typography variant="heading">Features</c-vas-typography>
    <c-vas-html-validation />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasHtmlValidation from '../features/c-vas-html-validation.vue';
  import cVasTypography from './c-vas-typography.vue';

  /**
   * Component for managing global settings.
   */
  export default defineComponent({
    name: 'c-vas-features',

    components: {
      cVasHtmlValidation,
      cVasTypography,
    },

    methods: {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-features {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--10;

    &__custom-settings {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--10;
      margin-top: variables.$vas-spacing--20;
      border-top: 1px solid variables.$vas-theme-border-color;
    }
  }
</style>
