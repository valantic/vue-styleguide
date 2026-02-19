<template>
  <label :class="b()">
    <span class="invisible">Language</span>
    <e-vas-select
      v-model="internalValue"
      :options="options"
    />
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasSelect, { Options } from '../elements/e-vas-select.vue';
  import { useVasSettingsStore } from '../stores/settings';

  type Setup = {
    vasSettingsStore: ReturnType<typeof useVasSettingsStore>;
  };
  // type Data = {};

  export default defineComponent({
    name: 'c-vas-language',

    components: {
      eVasSelect,
    },

    // props: {},

    emits: {
      change: (value: string) => typeof value === 'string',
    },

    setup(): Setup {
      return {
        vasSettingsStore: useVasSettingsStore(),
      };
    },
    // data(): Data {
    //   return {};
    // },

    // components: {},
    computed: {
      internalValue: {
        get() {
          return this.vasSettingsStore.state.language;
        },
        set(value: string) {
          this.vasSettingsStore.setLanguage(value);
          this.$emit('change', value);
        },
      },

      options(): Options[] {
        return this.vasSettingsStore.state.settings.availableLanguages.map((item) => ({
          label: item.label,
          value: item.value,
        }));
      },
    },

    // watch: {},

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
