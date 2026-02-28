<template>
  <div :class="b()">
    <div :class="b('container')">
      <c-vas-icon-headline
        icon="i-vuejs"
        text="Styleguide"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasIconHeadline from '@/components/c-vas-icon-headline.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide header.
   */
  export default defineComponent({
    name: 's-header',
    components: {
      cVasIconHeadline,
    },

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
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  .s-header {
    border-bottom: 1px solid variables.$vas-color-grayscale--600;
    background-color: rgba(variables.$vas-color-green-vue, 0.1);

    &__container {
      @include mixins.container;

      padding: variables.$vas-spacing--10;
      display: flex;
    }
  }
</style>
