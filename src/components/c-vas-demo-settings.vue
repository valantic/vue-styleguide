<template>
  <ul :class="b()">
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
  import { defineComponent } from 'vue';
  import cVasHtmlValidation from './c-vas-html-validation.vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';

  // type Setup = {};

  type Data = {
    /**
     * Determines if the user is logged in.
     */
    loggedIn: boolean;

    /**
     * Determines if the api handler configuration is displayed.
     */
    showApiHandlerConfiguration: boolean;
  };

  export default defineComponent({
    name: 'c-vas-demo-settings',

    components: {
      eVasToggle,
      cVasHtmlValidation,
    },

    // props: {},
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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-demo-settings {
    &__item {
      margin-bottom: variables.$spacing--10;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
