<template>
  <label :class="b()">
    <span class="invisible">Theme</span>
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
    name: 'c-vas-theme-selector',

    components: {
      eVasSelect,
    },

    // props: {},

    // emits: {},

    setup(): Setup {
      return {
        vasSettingsStore: useVasSettingsStore(),
      };
    },
    // data(): Data {
    //   return {};
    // },

    computed: {
      internalValue: {
        get() {
          return this.vasSettingsStore.state.settings.activeTheme;
        },
        set(value: string) {
          this.vasSettingsStore.updateActiveTheme(value);
        },
      },

      options(): Options[] {
        return this.vasSettingsStore.state.settings.availableThemes.map((item) => ({
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
    // mounted() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>
