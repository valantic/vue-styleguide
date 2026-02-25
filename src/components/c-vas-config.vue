<template>
  <div :class="b()">
    <div :class="b('headline')">Global Settings</div>
    <c-vas-language />
    <c-vas-theme-selector />
    <c-vas-html-validation />
    <e-vas-toggle v-model="vasSettingsStore.state.settings.isLoggedIn">
      <span>Logged in</span>
    </e-vas-toggle>

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
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import { useVasSettingsStore } from '../stores/settings';
  import cVasHtmlValidation from './c-vas-html-validation.vue';
  import cVasLanguage from './c-vas-language.vue';
  import cVasThemeSelector from './c-vas-theme-selector.vue';

  type Setup = {
    vasSettingsStore: ReturnType<typeof useVasSettingsStore>;
  };
  // type Data = {};

  export default defineComponent({
    name: 'c-vas-config',

    components: {
      cVasHtmlValidation,
      eVasToggle,
      cVasLanguage,
      cVasThemeSelector,
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
    // methods: {},
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
