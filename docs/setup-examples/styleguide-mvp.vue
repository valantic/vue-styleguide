<template>
  <router-view />
  <c-vas-sidebar />
</template>

<script lang="ts">
  import { cVasSidebar } from '@valantic/vue-styleguide';
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide application.
   */
  export default defineComponent({
    name: 'styleguide-mvp',

    components: {
      cVasSidebar,
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
  .styleguide-mvp {
    // Add you custom styling.
  }
</style>
