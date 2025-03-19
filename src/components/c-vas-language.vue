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
  import i18n, { I18N_LOCALES } from '../setup/i18n';
  import eVasSelect, { Options } from '../elements/e-vas-select.vue';

  // type Setup = {};

  type Data = {
    i18nLocales: string[];
  };

  export default defineComponent({
    name: 'c-vas-language',

    components: {
      eVasSelect
    },

    // props: {},

    // setup(): Setup {
    //   return {
    //   };
    // },
    data(): Data {
      return {
        i18nLocales: I18N_LOCALES,
      };
    },

    // components: {},
    computed: {
      options(): Options[] {
        return this.i18nLocales.map(locale => ({
          value: locale,
          label: this.$t(`s-language.${locale}`)
        }));
      },

      /**
       * The current language.
       */
      language: {
        get() {
          // @ts-ignore -- 'locale' is a reactive, not a string. @see https://github.com/intlify/vue-i18n-next/issues/785
          return i18n.global.locale?.value;
        },
        set(value: string) {
          // TODO: we need to set the locale.
        },
      },
    },
    // methods: {},
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
  });
</script>

<style lang="scss">
  // .c-vas-language {}
</style>
