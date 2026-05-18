<template>
  <span :class="b()">
    <slot />
    <span
      v-if="text"
      :class="b('bubble', { [position]: true })"
      role="tooltip"
    >
      {{ text }}
    </span>
  </span>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Wraps any trigger element and shows a tooltip bubble on hover.
   * Position can be controlled via the `position` prop.
   */
  export default defineComponent({
    name: 'c-vas-tooltip',

    // components: {},

    props: {
      /**
       * Tooltip text. If not provided the component renders transparently.
       */
      text: {
        type: String,
        default: null,
      },

      /**
       * Where to place the bubble relative to the trigger.
       */
      position: {
        type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
        default: 'top',
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

  .c-vas-tooltip {
    position: relative;
    display: flex;

    &__bubble {
      position: absolute;
      z-index: 200;
      pointer-events: none;
      opacity: 0;
      white-space: nowrap;
      background-color: var(--vas-theme-background-surface);
      border: 2px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      color: var(--vas-theme-text-color);
      font-size: variables.$vas-font-size--14;
      padding: variables.$vas-spacing--8;
      transition: opacity variables.$vas-transition--default;

      &--top {
        bottom: calc(100% + 5px);
        left: 50%;
        transform: translateX(-50%);
      }

      &--bottom {
        top: calc(100% + 5px);
        left: 50%;
        transform: translateX(-50%);
      }

      &--left {
        right: calc(100% + 5px);
        top: 50%;
        transform: translateY(-50%);
      }

      &--right {
        left: calc(100% + 5px);
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &:hover &__bubble {
      opacity: 1;
    }
  }
</style>
