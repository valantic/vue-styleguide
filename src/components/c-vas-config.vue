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
      <e-vas-toggle
        v-model="loggedIn"
        value
      >
        Logged in (coming soon)
      </e-vas-toggle>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import cVasHtmlValidation from './c-vas-html-validation.vue';
  import cVasLanguage from './c-vas-language.vue';
  import cVasThemeSelector from './c-vas-theme-selector.vue';

  // type Setup = {};
  type Data = {
    loggedIn: boolean;
  };

  export default defineComponent({
    name: 'c-vas-config',

    components: {
      cVasHtmlValidation,
      eVasToggle,
      cVasLanguage,
      cVasThemeSelector,
    },
    // props: {},

    // setup(): Setup {
    //   return {
    //   };
    // },
    data(): Data {
      return {
        loggedIn: true,
      };
    },
    // computed: {},
    // methods: {},
  });
</script>

<style lang="scss">
  .c-vas-config {
    &__item {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
