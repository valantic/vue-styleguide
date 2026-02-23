<template>
  <div :class="b()">
    <div :class="b('container')">
      <img
        :class="b('logo')"
        src="@/assets/valantic.svg"
        alt="vuejs"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide footer.
   */
  export default defineComponent({
    name: 's-footer',

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
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  .s-footer {
    border-top: 1px solid variables.$vas-color-grayscale--600;
    background-color: rgba(variables.$vas-color-green-vue, 0.1);

    &__container {
      @include mixins.container;

      padding: variables.$vas-spacing--10;
    }

    &__logo {
      width: 100px;
    }
  }
</style>
