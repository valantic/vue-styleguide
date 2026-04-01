<template>
  <router-view />
  <c-vas-sidebar>
    <template #customSettings>
      <e-vas-toggle v-model="isLoggedIn"> Logged In </e-vas-toggle>

      <label>
        Language:
        <e-vas-select
          :model-value="currentLocale"
          :options="locales"
        />
      </label>

      <label>
        Theme:
        <e-vas-select
          :model-value="currentTheme"
          :options="themes"
        />
      </label>
    </template>
  </c-vas-sidebar>
</template>

<script lang="ts">
  import { cVasSidebar } from '@valantic/vue-styleguide';
  import { eVasSelect, eVasToggle } from '@valantic/vue-styleguide/elements';
  import { defineComponent } from 'vue';

  // Let's assume that there are theme scss files at this location.
  const THEME_PATH = '/src/setup/scss/themes/theme-';

  type SelectOption = {
    label: string;
    value: string;
  };

  // type Setup = {};
  type Data = {
    isLoggedIn: boolean;
    currentTheme: string;
    currentLocale: string;
    locales: SelectOption[];
    themes: SelectOption[];
  };

  export default defineComponent({
    name: 'styleguide-advanced',

    components: {
      eVasToggle,
      cVasSidebar,
      eVasSelect,
    },

    // props: {},
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        isLoggedIn: false,
        currentTheme: 'light',
        currentLocale: 'de',
        locales: [
          {
            label: 'Deutsch',
            value: 'de',
          },
          {
            label: 'English',
            value: 'en',
          },
        ],
        themes: [
          {
            label: 'Sun Light Theme',
            value: 'light',
          },
          {
            label: 'The Dark Knight Theme',
            value: 'dark',
          },
        ],
      };
    },

    // computed: {},
    watch: {
      /**
       * Watches for changes of the «theme» and sets or changes the stylesheet with the
       * custom theme css-variables
       */
      currentTheme: {
        immediate: true,
        handler() {
          const cssId = 'themeStylesheet';
          const link = document.getElementById(cssId) as HTMLAnchorElement;

          if (link?.href) {
            link.href = `${THEME_PATH}${this.currentTheme}.scss`;
          } else {
            this.createStyleElement(this.currentTheme, cssId);
          }
        },
      },
    },
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
      /**
       * This is an example of how you could set and change the used theme.
       * Please note, there are so many ways how to handle theme changes, this is only a more complex example.
       *
       * @param {String} themeId - The name of the desired theme.
       * @param {String} cssId - The unique ID for the link element.
       */
      createStyleElement(themeId: string, cssId: string) {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');

        if (link && head) {
          link.id = cssId;
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = `${THEME_PATH}${themeId}.scss`;
          link.media = 'all';

          head.append(link);
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  .styleguide-advanced {
    // Add you custom styling.
  }
</style>
