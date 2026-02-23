<template>
  <div :class="b()">
    <img
      :class="b('logo')"
      src="../assets/vuejs.svg"
      alt="vuejs"
    />
    <span :class="b('slogan')">Styleguide</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide brand component.
   */
  export default defineComponent({
    name: 'c-vas-styleguide-brand',

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

  .c-vas-styleguide-brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: variables.$vas-spacing--6;
    color: variables.$vas-color-green-vue;
    font-size: variables.$vas-font-size--18;
    font-weight: 900;

    &__logo {
      width: 22px;
    }
  }
</style>
