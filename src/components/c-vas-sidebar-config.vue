<template>
  <ul :class="b()">
    <li :class="b('item')">
      <c-vas-language />
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
  import cVasLanguage from './c-vas-language.vue';
  import cVasThemeSelector, { Theme } from './c-vas-theme-selector.vue';
  import eVasToggle from '@/elements/e-vas-toggle.vue';
  import cVasHtmlValidation from '@/components/c-vas-html-validation.vue';

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
        type: Array as PropType<Theme[]>,
        default: () => [],
      },
    },

    emits: {
      'updateTheme': (theme: string) => typeof theme === 'string',
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
      }
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
