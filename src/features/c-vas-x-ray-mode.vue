<template>
  <div :class="b()">
    <e-vas-toggle v-model="enabled"> X-ray mode </e-vas-toggle>

    <p
      v-if="enabled && !markerActive"
      :class="b('warning')"
    >
      For accurate results across third-party components, install the x-ray inspector plugin — see the
      <a
        :href="setupGuideUrl"
        target="_blank"
        rel="noopener noreferrer"
        >setup guide</a
      >.
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import { type VasSettingsStore, useVasSettingsStore } from '../stores/settings';
  import { hasComponentMarker } from '../utils/vue-component-inspector';

  type Setup = {
    vasSettingsStore: VasSettingsStore;
  };

  type Data = {
    // Whether the vasXRayInspector plugin marked this component's own root element on mount —
    // the simplest reliable proof that it's actually registered on this app. Optimistic default
    // to avoid flashing a false warning before mounted() has had a chance to check.
    markerActive: boolean;
  };

  const SETUP_GUIDE_URL = 'https://github.com/valantic/vue-styleguide/blob/main/docs/x-ray-mode.md';

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
    data(): Data {
      return {
        markerActive: true,
      };
    },

    computed: {
      enabled: {
        get(): boolean {
          return this.vasSettingsStore.state.isXRayModeEnabled;
        },
        set(value: boolean) {
          this.vasSettingsStore.setXRayModeEnabled(value);
        },
      },

      setupGuideUrl(): string {
        return SETUP_GUIDE_URL;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.markerActive = hasComponentMarker(this.$el);
    },
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

  .c-vas-x-ray-mode {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--8;

    &__warning {
      margin: 0;
      color: variables.$vas-color-status--error;
      font-size: var(--vas-font-size-small);

      a {
        color: inherit;
        text-decoration: underline;
      }
    }
  }
</style>
