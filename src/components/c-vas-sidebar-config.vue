<template>
  <ul :class="b()">
    <li :class="b('item')">
      <c-vas-language :selected-language="selectedLanguage"
                      :available-languages="availableLanguages"
                      @update-language="onUpdateLanguage" />
    </li>
    <li :class="b('item')">
      <c-vas-theme-selector
        :theme-path="themePath"
        :available-themes="availableThemes"
        @change="onUpdateTheme"
      />
    </li>
    <li :class="b('item')">
      <c-vas-html-validation />
    </li>
    <li :class="b('item')">
      <e-vas-toggle
        v-model="loggedIn"
        value
      >
        Logged in
      </e-vas-toggle>
    </li>
    <li :class="b('item')">
      <e-vas-toggle
        v-model="showApiHandlerConfiguration"
        value
      >
        API Mock Test
      </e-vas-toggle>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { ThemeConfig } from '../types/settings';
  import cVasLanguage from './c-vas-language.vue';
  import cVasThemeSelector from './c-vas-theme-selector.vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import cVasHtmlValidation from './c-vas-html-validation.vue';

  // type Setup = {};
  type Data = {
    loggedIn: boolean;
    showApiHandlerConfiguration: boolean;
  };

  export default defineComponent({
    name: 'c-vas-sidebar-config',

    components: {
      cVasHtmlValidation,
      eVasToggle,
      cVasLanguage,
      cVasThemeSelector,
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
        type: Array as PropType<ThemeConfig[]>,
        default: () => [],
      },

      availableLanguages: {
        type: Array as () => string[],
        default: () => [],
      },

      selectedLanguage: {
        type: String,
        default: '',
      },
    },

    emits: {
      'updateTheme': (theme: string) => typeof theme === 'string',
      'updateLanguage': (language: string) => typeof language === 'string',
    },
    // setup(): Setup {
    //   return {
    //   };
    // },
    data(): Data {
      return {
        loggedIn: true,
        showApiHandlerConfiguration: false,
      };
    },
    // computed: {},
    methods: {
      onUpdateTheme(theme: string) {
        this.$emit('updateTheme', theme);
      },

      onUpdateLanguage(language: string) {
        this.$emit('updateLanguage', language);
      },
    },
  });
</script>

<style lang="scss">
  .c-vas-sidebar-config {
    &__item {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
