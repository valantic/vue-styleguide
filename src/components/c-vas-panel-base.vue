<template>
  <div :class="b()">
    <div :class="b('slot', { top: true })">
      <slot name="top"></slot>
    </div>
    <div :class="b('slot', { left: true })">
      <slot name="left"></slot>
    </div>
    <div :class="b('content')">
      <slot name="content"></slot>
    </div>
    <div :class="b('slot', { right: true })">
      <slot name="right"></slot>
    </div>
    <div :class="b('slot', { bottom: true })">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   *
   */
  export default defineComponent({
    name: 'c-vas-panel-base',

    // components: {},

    // props: {},
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

  .c-vas-panel-base {
    $bar-size: variables.$vas-theme-panel-bar-size;

    background-color: var(--vas-theme-background-container);
    display: grid;
    grid-template-areas:
      'top top top'
      'left content right'
      'bottom bottom bottom';
    grid-template-columns: $bar-size 1fr $bar-size;
    grid-template-rows: $bar-size 1fr $bar-size;
    width: 100%;
    height: 100%;
    color: var(--vas-theme-text-color);

    &__slot {
      display: flex;
      gap: variables.$vas-theme-panel-spacing-between-elements;

      &--top {
        grid-area: top;
      }

      &--bottom {
        grid-area: bottom;
      }

      &--top,
      &--bottom {
        width: 100%;
        padding: 4px;
      }

      &--left {
        grid-area: left;
      }

      &--right {
        grid-area: right;
      }

      &--left,
      &--right {
        flex-direction: column;
        padding: 6px 4px;
        height: 100%;
      }
    }

    &__content {
      grid-area: content;
      background-color: var(--vas-theme-background-content);
      border-radius: 6px;
      padding: 10px;
      min-height: 0;
      overflow: hidden auto;
    }
  }
</style>
