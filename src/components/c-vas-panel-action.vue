<template>
  <button
    :class="b({ [variant]: true, active, disabled })"
    :disabled="disabled"
    :title="title || undefined"
    type="button"
  >
    <e-vas-icon
      v-if="icon"
      :icon="icon"
      size="14"
    />
    <slot />
  </button>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import type { Icon } from '../types/icon';

  // type Setup = {};
  // type Data = {};

  /**
   * Generic toolbar action button for panel slots (top, bottom, left, right).
   * Use variant="icon" for square icon-only buttons, variant="fluid" for text or icon+text buttons.
   */
  export default defineComponent({
    name: 'c-vas-panel-action',
    components: {
      eVasIcon,
    },

    props: {
      /**
       * Square icon-only button or fluid content-width button.
       */
      variant: {
        type: String as PropType<'icon' | 'fluid'>,
        default: 'icon',
      },

      /**
       * Optional icon from the sprite.
       */
      icon: {
        type: String as PropType<Icon>,
        default: null,
      },

      /**
       * Marks the button as active/selected.
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the button.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Tooltip text (also used as aria-label for icon-only buttons).
       */
      title: {
        type: String,
        default: null,
      },
    },
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

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
  @use '../setup/scss/variables';

  .c-vas-panel-action {
    $this: &;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--vas-theme-text-color);
    cursor: pointer;
    padding: 0;
    gap: variables.$vas-spacing--4;
    font-family: inherit;
    font-size: variables.$vas-font-size--12;
    line-height: 1;
    border-radius: variables.$vas-theme-border-radius;
    flex-shrink: 0;

    &:hover:not(#{$this}--disabled) {
      background-color: var(--vas-theme-background-surface-hover);
    }

    &--icon {
      width: 100%;
      aspect-ratio: 1;
    }

    &--fluid {
      height: 100%;
      padding: 0 variables.$vas-spacing--6;
      white-space: nowrap;
    }

    &--active {
      color: var(--vas-theme-text-color-highlight);
      background-color: var(--vas-theme-highlight);
    }

    &--disabled {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }
  }
</style>
