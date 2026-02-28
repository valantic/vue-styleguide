<template>
  <div :class="b()">
    <div :class="b('headline')">Global Settings</div>
    <label :class="b('language')">
      <span class="invisible">Language</span>
      <e-vas-select
        v-model="vasSettingsStore.config.settings.activeLanguage"
        :options="vasSettingsStore.config.options.languages"
      />
    </label>

    <label :class="b('theme')">
      <span class="invisible">Theme</span>
      <e-vas-select
        v-model="vasSettingsStore.config.settings.activeTheme"
        :options="vasSettingsStore.config.options.themes"
      />
    </label>

    <c-vas-html-validation />

    <e-vas-toggle v-model="vasSettingsStore.config.settings.isLoggedIn">Logged in</e-vas-toggle>

    <div
      v-if="$slots.customSettings"
      id="teleportDestinationStyleguideConfigFlyout"
      :class="b('custom-settings')"
    >
      <div :class="b('headline')">Custom Project Settings</div>
      <slot name="customSettings"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasSelect from '../elements/e-vas-select.vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import { VasSettingsStore, useVasSettingsStore } from '../stores/settings';
  import cVasHtmlValidation from './c-vas-html-validation.vue';

  type Setup = {
    vasSettingsStore: VasSettingsStore;
  };
  // type Data = {};

  export default defineComponent({
    name: 'c-vas-config',

    components: {
      eVasSelect,
      cVasHtmlValidation,
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
    //   return {
    //   };
    // },
    // computed: {},
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

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-config {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--10;

    &__headline {
      font-weight: bold;
      color: variables.$vas-theme-text-color-muted;
      margin: variables.$vas-spacing--10 0;
    }

    &__custom-settings {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--10;
      margin-top: variables.$vas-spacing--20;
      border-top: 1px solid variables.$vas-theme-border-color;
    }
  }
</style>
