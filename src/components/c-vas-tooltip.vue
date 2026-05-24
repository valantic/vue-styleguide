<template>
  <span
    :class="b()"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
    <span
      v-if="text"
      ref="bubble"
      :class="b('bubble', { [position]: true })"
      :style="bubbleStyle"
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
  type Data = {
    xShift: number;
    yShift: number;
  };

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
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        xShift: 0,
        yShift: 0,
      };
    },

    computed: {
      bubbleStyle(): Record<string, string> {
        if (this.xShift) {
          return { transform: `translateX(calc(-50% + ${this.xShift}px))` };
        }

        if (this.yShift) {
          return { transform: `translateY(calc(-50% + ${this.yShift}px))` };
        }

        return {};
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
      onMouseEnter() {
        const bubble = this.$refs.bubble as HTMLElement | undefined;

        if (!bubble) {
          return;
        }

        const rect = bubble.getBoundingClientRect();
        const margin = 4;

        if (this.position === 'top' || this.position === 'bottom') {
          let shift = 0;

          if (rect.right > window.innerWidth - margin) {
            shift = window.innerWidth - margin - rect.right;
          } else if (rect.left < margin) {
            shift = margin - rect.left;
          }

          this.xShift = shift;
        } else {
          let shift = 0;

          if (rect.bottom > window.innerHeight - margin) {
            shift = window.innerHeight - margin - rect.bottom;
          } else if (rect.top < margin) {
            shift = margin - rect.top;
          }

          this.yShift = shift;
        }
      },
      onMouseLeave() {
        this.xShift = 0;
        this.yShift = 0;
      },
    },
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
      font-size: variables.$vas-font-size--base;
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
