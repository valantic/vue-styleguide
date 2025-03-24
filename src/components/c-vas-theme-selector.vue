<template>
  <label>
    <span class="invisible">Theme</span>
    <e-vas-select
      v-model="theme"
      :class="b()"
      :options="options"
      @change="onChange"
    />
  </label>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import buildConfig from '../../vite.builds.json';
  import eVasSelect, { Options } from '../elements/e-vas-select.vue';

  type SelectEvent = Event & {
    currentTarget: {
      value: string;
    }
  };

  export type Theme = {
    name: string;
    id: string;
    selected?: boolean;
  };

  // type Data = {};

  // type Setup = {};

  export default defineComponent({
    name: 'c-vas-theme-selector',

    components: {
      eVasSelect,
    },

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
      theme: {
        get() {
          return 'theme-01'; // TODO: This needs to be changed.
        },
        set(value: string) {
          // TODO: we need to set the theme.
          console.log('set: ', value);
        },
      },

      options(): Options[] {
        return this.availableThemes.map(theme => ({
          value: theme.id,
          label: theme.name
        }));
      },

},

    watch: {
      /**
       * Watches for changes of the «theme» and sets or changes the stylesheet with the
       * custom theme css-variables
       */
      theme: {
        immediate: true,
        handler() {
          const cssId = 'themeStylesheet';
          const link = document.getElementById(cssId) as HTMLLinkElement;
          const { theme } = this;

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
      onChange(event: SelectEvent) {
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
