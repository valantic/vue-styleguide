<template>
  <div id="app">
    <router-view />
    <s-navigation nav-position="bottom-right"
                  :theme-path="themePath"
                  :available-themes="availableThemes"
                  @update-theme="onUpdateTheme"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sNavigation from './s-navigation.vue';
  import { Theme } from './s-theme-selector.vue';

  // type Setup = {};
  type Data = {
    themePath: string;
    availableThemes: Theme[];
  };

  export default defineComponent({
    name: 'app',

    components: {
      sNavigation,
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
  // Define #app styles in setup/scss/_globals.scss
</style>
