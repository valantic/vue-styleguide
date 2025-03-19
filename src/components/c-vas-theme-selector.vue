<template>
  <label>
    <span class="invisible">Theme</span>
    <select
      :class="b()"
      @change="onChange"
    >
      <option
        v-for="theme in themes"
        :key="theme.id"
        :value="theme.id"
        :selected="theme.selected"
      >
        {{ theme.name }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import buildConfig from '../../vite.builds.json';

  export type Theme = {
    name: string;
    id: string;
    selected?: boolean;
  };

  // type Data = {};

  // type Setup = {};

  export default defineComponent({
    name: 'c-vas-theme-selector',

    // components: {},

    props: {
      /**
       * Path to the theme scss files.
       */
      themePath: {
        type: String,
        default: 'src/setup/scss/themes',
      },

      /**
       * Array of available themes.
       */
      availableThemes: {
        type: Array as PropType<Theme[]>,
        default: () => [],
      },
    },

    emits: {
      'change': (theme: string) => theme,
    },

    // setup(): Setup {
    //   return {
    //   };
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      /**
       * Returns the currently active theme.
       */
      getTheme(): string {
        return 'theme-01'; // TODO: This needs to be changed.
      },

      /**
       * Loops the themes and mark the selected by the global theme.
       */
      themes(): Theme[] {
        const themes = this.availableThemes;
        const activeTheme = this.getTheme;

        return themes.map((theme) => ({
          ...theme,
          selected: theme.name === activeTheme,
        }));
      },
    },

    watch: {
      /**
       * Watches for changes of the «theme» and sets or changes the stylesheet with the
       * custom theme css-variables
       */
      getTheme: {
        immediate: true,
        handler() {
          const cssId = 'themeStylesheet';
          const link = document.getElementById(cssId) as HTMLLinkElement;
          const theme = this.getTheme;

          if (!link) {
            this.createStyleElement(theme, cssId);
          } else {
            link.href = `/${this.themePath}${theme}.scss`;
          }
        },
      },
    },

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
       * Event handler for the change event of the theme selector.
       */
      onChange(event: Event) {
        this.$emit('change', event.currentTarget?.value);
      },

      /**
       * Creates a new style link element.
       */
      createStyleElement(theme: string, cssId: string) {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');

        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `/${buildConfig.themeSource}${theme}.scss`;
        link.media = 'all';

        head?.appendChild(link);
      },
    },
    // render() {},
  });
</script>
