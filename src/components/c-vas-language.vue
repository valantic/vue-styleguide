<template>
  <label>
    <span class="invisible">Language</span>
    <e-vas-select
      v-model="language"
      :class="b()"
      :options="availableLanguages"
    />
  </label>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import eVasSelect, { Options } from '../elements/e-vas-select.vue';

  // type Setup = {};

  // type Data = {};

  export default defineComponent({
    name: 'c-vas-language',

    components: {
      eVasSelect,
    },

    props: {
      /**
       * Array of available languages.
       */
      availableLanguages: {
        type: Array as PropType<Options[]>,
        default: () => [],
      },

      /**
       * The currently selected language.
       */
      selectedLanguage: {
        type: String,
        default: '',
      },
    },

    emits: {
      updateLanguage: (language: string) => typeof language === 'string',
    },

    // setup(): Setup {
    //   return {
    //   };
    // },
    // data(): Data {
    //   return {};
    // },

    // components: {},
    computed: {
      /**
       * The current language.
       */
      language: {
        get() {
          return this.selectedLanguage;
        },
        set(value: string) {
          this.$emit('updateLanguage', value);
        },
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
