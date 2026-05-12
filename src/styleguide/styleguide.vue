<template>
  <div :class="b()">
    <s-header :class="b('header')" />
    <main :class="b('container')">
      <router-view />
    </main>
    <s-footer :class="b('footer')" />
    <c-vas-sidebar>
      <template
        #customSettings
        v-if="false"
      >
        Custom Settings can be placed here.
      </template>
    </c-vas-sidebar>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasSidebar from '../components/c-vas-sidebar.vue';
  import sFooter from './components/s-footer.vue';
  import sHeader from './components/s-header.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Root styleguide component that provides layout and configuration.
   */
  export default defineComponent({
    name: 'styleguide',

    components: {
      sHeader,
      sFooter,
      cVasSidebar,
    },

    // props: {},
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
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  // stylelint-disable selector-max-id
  html,
  #app {
    height: 100%;
  }
  // Define #app styles in setup/scss/_globals.scss
  // stylelint-disable selector-class-pattern
  .styleguide {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;

    &__container {
      @include mixins.container;
    }
  }
</style>
