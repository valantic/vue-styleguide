<template>
  <div :class="b('', modifiers)">
    <div
      v-if="$slots.controls"
      :class="b('controls', modifiers)"
    >
      <slot name="controls"></slot>
    </div>
    <div :class="b('content')">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import type { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  type Data = {
    hide: boolean;
  };

  export const FLYOUT_DIRECTIONS = ['left', 'right'];
  export type FlyoutDirectionType = (typeof FLYOUT_DIRECTIONS)[number];

  /**
   * A flyout.
   */
  export default defineComponent({
    name: 'c-vas-flyout',

    // components: {},

    props: {
      /**
       * Toggles the visibility.
       */
      isOpen: {
        type: Boolean,
        default: false,
      },

      /**
       * Define how it should be opened.
       */
      direction: {
        type: String as PropType<FlyoutDirectionType>,
        default: 'left',
        validator: (value: string) => FLYOUT_DIRECTIONS.includes(value),
      },
    },
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        hide: false,
      };
    },

    computed: {
      modifiers(): Modifiers {
        return {
          direction: this.direction,
          isOpen: this.isOpen,
          hide: this.hide,
        };
      },
    },
    watch: {
      // This is catching an edge case where the flyout changes the direction and is flaky for a moment.
      direction() {
        if (!this.isOpen) {
          this.hide = true;

          setTimeout(() => {
            this.hide = false;
          }, 15);
        }
      },
    },

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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-vas-flyout {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    width: variables.$vas-flyout--width;
    height: 100%;
    background-color: var(--vas-theme-background-content);
    border-inline-start-width: 0;
    border-inline-end-width: 0;
    border-inline-style: solid;
    border-inline-color: var(--vas-theme-border-color);
    transition-property: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    box-shadow:
      0 20px 25px -5px rgba(variables.$vas-color-black, 0.1),
      0 8px 10px -6px rgba(variables.$vas-color-black, 0.1);
    pointer-events: auto;

    &--hide {
      display: none;
    }

    &--is-open {
      transform: translateX(0) !important; // stylelint-disable-line declaration-no-important
    }

    &--direction-left {
      left: 0;
      transform: translateX(-100%);
      border-inline-end-width: 1px;
    }

    &--direction-right {
      right: 0;
      transform: translateX(100%);
      border-inline-start-width: 1px;
    }

    &__controls {
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: end;
      height: 100%;
      align-items: flex-end;
      opacity: 0.2;
      transition: opacity variables.$vas-transition--default;
      width: 32px;

      &:hover:not(&--is-open) {
        opacity: 0.8;
      }

      &--is-open {
        opacity: 1;
      }

      &--direction-right {
        right: 100%;
      }

      &--direction-left {
        left: 100%;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
</style>
