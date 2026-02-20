<template>
  <div :class="b()">
    <router-view />
    <c-vas-sidebar
      :settings="styleguideSettings"
      @update-theme="onUpdateTheme"
      @update-language="onUpdateLanguage"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasSidebar from '../components/c-vas-sidebar.vue';
  import { StyleguideSettings } from '../types/settings';

  // type Setup = {};
  type Data = {
    styleguideSettings: StyleguideSettings;
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
        styleguideSettings: {
          availableThemes: [
            {
              label: 'theme-01',
              value: 'theme-01',
            },
            {
              label: 'theme-02',
              value: 'theme-02',
              selected: true,
            },
          ],
          availableLanguages: [
            {
              label: 'English',
              value: 'en',
              selected: true,
            },
            {
              label: 'Deutsch',
              value: 'de',
            },
          ],
        },
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
      onUpdateTheme(theme: string) {
        // eslint-disable-next-line no-console
        console.log('Theme updated', theme);
      },

      onUpdateLanguage(language: string) {
        // eslint-disable-next-line no-console
        console.log('language updated', language);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:map';
  @use '../setup/scss/variables';

  html,
  #app {
    height: 100%;
  }
  // Define #app styles in setup/scss/_globals.scss
  // stylelint-disable selector-class-pattern
  .styleguide {
    height: 100%;
    max-width: map.get(variables.$vas-breakpoints, xl);
    margin: 0 auto;
    padding: variables.$vas-spacing--30;
  }
</style>
