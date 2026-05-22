<template>
  <div :class="b()">
    <e-vas-button
      type="button"
      @click="clearAllPersistentItems"
    >
      Remove persisted values
    </e-vas-button>

    <slot name="globalSettings">
      <div :class="b('headline')">Global Settings</div>
      <c-vas-html-validation />
    </slot>
    <div
      v-if="$slots.customSettings"
      id="teleportDestinationStyleguideConfigFlyout"
      :class="b('custom-settings')"
    >
      <div :class="b('headline')">Custom Project Settings</div>
      <slot name="customSettings"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasButton from '../elements/e-vas-button.vue';
  import cVasHtmlValidation from '../features/c-vas-html-validation.vue';
  import { clearAllPersistentItems } from '../stores/helper';

  /**
   * Component for managing global settings.
   */
  export default defineComponent({
    name: 'c-vas-config',

    components: {
      eVasButton,
      cVasHtmlValidation,
    },

    methods: {
      /**
       * Clears all persistent items.
       */
      clearAllPersistentItems,
    },
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-config {
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
