<template>
  <div id="app">
    <router-view />
    <s-navigation nav-position="bottom-right" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sNavigation from '../components/s-navigation.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'app',

    components: {
      sNavigation,
    },

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
  // Define #app styles in setup/scss/_globals.scss
</style>
