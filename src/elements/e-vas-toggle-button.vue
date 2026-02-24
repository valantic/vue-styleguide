<template>
  <button
    :class="b('', { active })"
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
   * A toggle button-
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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-vas-toggle-button {
    $border-radius: 6px;

    display: inline-flex;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;
    color: variables.$vas-color-grayscale--300;
    border: 1px solid variables.$vas-color-grayscale--700;
    padding: variables.$vas-spacing--6;
    font-size: variables.$vas-font-size--16;
    font-weight: 500;
    outline-color: transparent;
    background-color: variables.$vas-color-grayscale--800;
    border-radius: $border-radius;
    transition:
      color variables.$vas-transition--default,
      background-color variables.$vas-transition--default;

    &:hover:not(&--active) {
      background-color: variables.$vas-color-grayscale--700;
    }

    &--active {
      color: variables.$vas-color-grayscale--0;
    }

    &__content {
      display: inline-flex;
      flex: 1 1 auto;
      align-items: center;
      justify-content: center;
      gap: variables.$vas-spacing--4;
      border-right: $border-radius;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--12;

      &--active {
        background-color: variables.$vas-color-white;
        box-shadow:
          0 1px 2px 0 rgba(variables.$vas-color-black, 0.02),
          0 1px 2px 0 rgba(variables.$vas-color-black, 0.04);
      }
    }
  }
</style>
