<template>
  <button
    :class="b({ isOpen, isAnimated })"
    type="button"
    @click="$emit('toggle')"
  >
    <e-vas-icon
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
   * Flyout trigger handle.
   */
  export default defineComponent({
    name: 'c-vas-flyout-handle',
    components: { eVasIcon },

    props: {
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

      /**
       * Define if the button should be animated.
       */
      isAnimated: {
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
    width: 32px;
    height: 32px;
    color: var(--vas-theme-text-color-muted);
    border-radius: 0 2px 2px 0;
    border-left: 2px solid transparent;
    opacity: 1;
    transition:
      opacity variables.$vas-transition--default,
      color variables.$vas-transition--default,
      background-color variables.$vas-transition--default,
      border-color variables.$vas-transition--default;

    &:hover {
      color: var(--vas-theme-text-color);
    }

    &--is-open {
      opacity: 0;
    }

    &--is-animated {
      background-color: variables.$vas-color-valantic-primary;
      box-shadow: 0 0 40px variables.$vas-color-valantic-primary;
      color: variables.$vas-color-black;
    }
  }
</style>
