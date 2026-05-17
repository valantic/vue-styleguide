<template>
  <div :class="b()">
    <div :class="b('top')">
      <slot name="top"></slot>
    </div>
    <div :class="b('left')">
      <slot name="left"></slot>
    </div>
    <div :class="b('content')">
      <slot name="content"></slot>
    </div>
    <div :class="b('right')">
      <slot name="right"></slot>
    </div>
    <div :class="b('bottom')">
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
  .c-vas-panel-base {
    $spacing-between-elements: 4px;

    background-color: var(--vas-theme-background-container);
    display: grid;
    grid-template-areas:
      'top top top'
      'left content right'
      'bottom bottom bottom';
    grid-template-columns: 32px 1fr 8px;
    grid-template-rows: 32px 1fr 32px;
    width: 100%;
    height: 100%;
    color: var(--vas-theme-text-color);

    &__top {
      grid-area: top;
      display: flex;
      padding: 2px 8px;
      gap: $spacing-between-elements;
    }

    &__left {
      grid-area: left;
      display: flex;
      flex-direction: column;
      padding: 8px 2px;
      gap: $spacing-between-elements;
    }

    &__content {
      grid-area: content;
      background-color: var(--vas-theme-background-content);
      border-radius: 6px;
      padding: 6px 10px;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &__right {
      grid-area: right;
      display: flex;
      flex-direction: column;
      padding: 8px 2px;
      gap: $spacing-between-elements;
    }

    &__bottom {
      grid-area: bottom;
      display: flex;
      padding: 2px 8px;
      gap: $spacing-between-elements;
    }
  }
</style>
