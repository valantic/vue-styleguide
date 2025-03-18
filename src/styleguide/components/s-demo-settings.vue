<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-html-validation />
      <label>
        <input
          v-model="loggedIn"
          type="checkbox"
          name="logged-in"
          value
        />
        Logged in
      </label>

      <label>
        <input
          v-model="showApiHandlerConfiguration"
          type="checkbox"
          name="api-mock"
          value
        />
        API Mock Test
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sHtmlValidation from '@/styleguide/components/s-html-validation.vue';

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
    name: 's-demo-settings',

    components: {
      sHtmlValidation,
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
  @use '../../setup/scss/variables';

  .s-demo-settings {
    margin-top: variables.$spacing--10;

    .s-toggle + .s-toggle {
      margin-top: variables.$spacing--5;
    }
  }
</style>
