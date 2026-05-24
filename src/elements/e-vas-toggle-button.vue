<template>
  <button
    :class="b('', { active, isAnimated })"
    type="button"
  >
    <span :class="b('content', { active })">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * A toggle button.
   */
  export default defineComponent({
    name: 'e-vas-toggle-button',

    // components: {},

    props: {
      /**
       * Define active state.
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Define if button should be animated.
       */
      isAnimated: {
        type: Boolean,
        default: false,
      },
    },
    // emits: {},

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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-vas-toggle-button {
    $border-radius: variables.$vas-theme-border-radius;

    display: inline-flex;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;
    color: var(--vas-theme-text-color-muted);
    border: 1px solid var(--vas-theme-border-color);
    padding: variables.$vas-spacing--6;
    font-size: variables.$vas-font-size--label;
    font-weight: 500;
    outline-color: transparent;
    background-color: var(--vas-theme-background-surface);
    border-radius: $border-radius;
    transition:
      color variables.$vas-transition--default,
      box-shadow variables.$vas-transition--default,
      background-color variables.$vas-transition--default;

    &:hover:not(&--active) {
      background-color: var(--vas-theme-background-surface-hover);
    }

    &--active {
      color: var(--vas-theme-text-color);
    }

    &--is-animated {
      background-color: variables.$vas-color-valantic-primary;
      box-shadow: 0 0 40px variables.$vas-color-valantic-primary;
      color: variables.$vas-color-black;
    }

    &__content {
      display: inline-flex;
      flex: 1 1 auto;
      align-items: center;
      justify-content: center;
      gap: variables.$vas-spacing--4;
      border-radius: $border-radius;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--12;

      &--active {
        background-color: var(--vas-theme-background-content);
        box-shadow:
          0 1px 2px 0 rgba(variables.$vas-color-black, 0.02),
          0 1px 2px 0 rgba(variables.$vas-color-black, 0.04);
      }
    }
  }
</style>
