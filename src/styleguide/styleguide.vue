<template>
  <div id="app" :class="b()">
    <router-view />
    <c-vas-sidebar
      :theme-path="themePath"
      :available-themes="availableThemes"
      @update-theme="onUpdateTheme"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasSidebar from '../components/c-vas-sidebar.vue';
  import { Theme } from '../components/c-vas-theme-selector.vue';

  // type Setup = {};
  type Data = {
    themePath: string;
    availableThemes: Theme[];
  };

  export default defineComponent({
    name: 'styleguide',

    components: {
      cVasSidebar,
    },

    // props: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        themePath: 'src/setup/scss/themes',
        availableThemes: [
          {
            name: 'theme-01',
            id: 'theme-01',
            selected: true,
          },
          {
            name: 'theme-02',
            id: 'theme-02',
            selected: false,
          },
        ],
      };
    },

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

    methods: {
      onUpdateTheme() {
        // TODO: Update theme in the app.
      }
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:map';
  @use '../setup/scss/variables';

  // Define #app styles in setup/scss/_globals.scss
  // stylelint-disable selector-class-pattern
  .styleguide {
    max-width: map.get(variables.$vas-breakpoints, xl);
    margin: 0 auto;
    padding: variables.$vas-spacing--30;
  }
</style>
