<template>
  <div :class="b()">
    <div :class="b('content')">
      <div :class="b('inner')">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};

  // type Data = {};

  export default defineComponent({
    name: 'l-default',

    // components: {},

    // props: {},

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
  @use 'sass:map';
  @use '@/setup/scss/variables';
  @use '@/setup/scss/mixins';

  .l-default {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &__content {
      flex: 1 0 auto;
      background: variables.$color-grayscale--600;
    }

    &__inner {
      position: relative;
      max-width: #{map.get(variables.$breakpoints, xl) - 20px};
      margin: 0 auto;
      background: variables.$color-grayscale--1000;
      box-shadow: 0 4px 10px 1px rgba(#cccccc, 0.3);
    }
  }
</style>
