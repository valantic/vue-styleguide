<template>
  <button
    :class="b({ [variant]: true, isOpen })"
    type="button"
    @click="$emit('toggle')"
  >
    <e-vas-icon
      v-if="variant === 'icon'"
      :icon="icon"
      size="16"
    />
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
   * Flyout trigger handle — two variants: a minimal pull-tab or a single square icon button.
   */
  export default defineComponent({
    name: 'c-vas-flyout-handle',
    components: { eVasIcon },

    props: {
      /**
       * Visual style of the handle.
       */
      variant: {
        type: String as PropType<'pull-tab' | 'icon'>,
        default: 'icon',
      },

      /**
       * Icon shown in the icon variant.
       */
      icon: {
        type: String as PropType<Icon>,
        default: 'i-cog-wheel',
      },

      /**
       * Reflects whether the flyout is currently open.
       */
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    emits: {
      toggle: () => true,
    },

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

  .c-vas-flyout-handle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    cursor: pointer;
    background-color: var(--vas-theme-background-container);

    // --- Pull-tab variant ---
    &--pull-tab {
      width: 8px;
      height: 56px;
      background-color: var(--vas-theme-text-color);
      border-radius: 4px 0 0 4px;
      opacity: 0.15;
      transition:
        opacity variables.$vas-transition--default,
        width variables.$vas-transition--default;

      &:hover {
        opacity: 0.65;
        width: 12px;
      }

      &.c-vas-flyout-handle--is-open {
        opacity: 0;
        width: 0;
        pointer-events: none;
      }
    }

    // --- Icon button variant ---
    &--icon {
      width: 32px;
      height: 32px;
      color: var(--vas-theme-text-color-muted);
      border-radius: 0 2px 2px 0;
      border-left: 2px solid transparent;
      transition:
        color variables.$vas-transition--default,
        background-color variables.$vas-transition--default,
        border-color variables.$vas-transition--default;

      &:hover {
        color: var(--vas-theme-text-color);
      }

      &.c-vas-flyout-handle--is-open {
        border-left-color: variables.$vas-color-valantic-primary;
        color: var(--vas-theme-text-color);
      }
    }
  }
</style>
