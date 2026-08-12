<template>
  <e-vas-toggle v-model="enabled"> X-ray mode </e-vas-toggle>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import { type VasSettingsStore, useVasSettingsStore } from '../stores/settings';

  type Setup = {
    vasSettingsStore: VasSettingsStore;
  };
  // type Data = {};

  /**
   * Adds a toggle to en-/disable x-ray mode: hover any element to see its Vue component name
   * and file path, click to copy them to the clipboard.
   */
  export default defineComponent({
    name: 'c-vas-x-ray-mode',

    components: {
      eVasToggle,
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
      enabled: {
        get(): boolean {
          return this.vasSettingsStore.state.isXRayModeEnabled;
        },
        set(value: boolean) {
          this.vasSettingsStore.setXRayModeEnabled(value);
        },
      },
    },
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
