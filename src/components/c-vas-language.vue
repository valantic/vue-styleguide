<template>
  <label>
    <span class="invisible">Language</span>
    <e-vas-select
      v-model="language"
      :class="b()"
      :options="options"
    />
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasSelect, { Options } from '../elements/e-vas-select.vue';

  // type Setup = {};

  type Data = {
    language: string;
  };

  export default defineComponent({
    name: 'c-vas-language',

    components: {
      eVasSelect
    },

    props: {
      /**
       * Array of available languages.
       */
      availableLanguages: {
        type: Array as () => string[],
        default: () => [],
      },
    },

    emits: {
      'updateLanguage': (language: string) => typeof language === 'string',
    },

    // setup(): Setup {
    //   return {
    //   };
    // },
    data(): Data {
      return {
        language: '',
      };
    },

    // components: {},
    computed: {
      options(): Options[] {
        return this.availableLanguages.map(language => ({
          value: language,
          label: language,
        }));
      },
    },
    // methods: {},
    watch: {
      language(newLanguage: string) {
        this.$emit('updateLanguage', newLanguage);
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
  });
</script>

<style lang="scss">
  // .c-vas-language {}
</style>
