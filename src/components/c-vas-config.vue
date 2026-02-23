<template>
  <ul :class="b()">
    <li :class="b('item')">
      <c-vas-language />
    </li>
    <li :class="b('item')">
      <c-vas-theme-selector />
    </li>
    <li :class="b('item')">
      <c-vas-html-validation />
    </li>
    <li :class="b('item')">
      <e-vas-toggle v-model="vasSettingsStore.state.settings.isLoggedIn">Logged in</e-vas-toggle>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import { useVasSettingsStore } from '../stores/settings';
  import cVasHtmlValidation from './c-vas-html-validation.vue';
  import cVasLanguage from './c-vas-language.vue';
  import cVasThemeSelector from './c-vas-theme-selector.vue';

  type Setup = {
    vasSettingsStore: ReturnType<typeof useVasSettingsStore>;
  };
  // type Data = {};

  export default defineComponent({
    name: 'c-vas-config',

    components: {
      cVasHtmlValidation,
      eVasToggle,
      cVasLanguage,
      cVasThemeSelector,
    },
    // props: {},
    // emits: {},

    setup(): Setup {
      return {
        vasSettingsStore: useVasSettingsStore(),
      };
    },
    // data(): Data {
    //   return {
    //   };
    // },
    // computed: {},
    // methods: {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-config {
    &__item {
      margin-bottom: variables.$vas-spacing--16;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
