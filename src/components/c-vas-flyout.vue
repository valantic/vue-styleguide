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
  import { defineComponent } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

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
        type: String,
        default: 'left',
        validator: (value: string) => ['left', 'right'].includes(value),
      },
    },
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      modifiers(): Modifiers {
        return {
          direction: this.direction,
          isOpen: this.isOpen,
        };
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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-vas-flyout {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    width: variables.$vas-flyout--width;
    height: 100%;
    background-color: variables.$vas-color-grayscale--1000;
    border-inline-start-width: 0;
    border-inline-end-width: 0;
    border-inline-style: solid;
    border-inline-color: variables.$vas-color-grayscale--600;
    transition: transform variables.$vas-transition--default;
    box-shadow:
      0 20px 25px -5px rgba(variables.$vas-color-black, 0.1),
      0 8px 10px -6px rgba(variables.$vas-color-black, 0.1);
    pointer-events: none;

    &--is-open {
      transform: translateX(0) !important; // stylelint-disable-line declaration-no-important
      pointer-events: auto;
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
      justify-content: space-between;
      height: 100%;
      pointer-events: none;
      align-items: flex-end;
      opacity: 0.2;
      transition: opacity variables.$vas-transition--default;
      width: 55px;

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
        justify-content: end;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      height: 100%;
    }
  }
</style>
