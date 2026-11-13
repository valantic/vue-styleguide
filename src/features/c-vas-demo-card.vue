<template>
  <div
    :class="b(modifiers)"
    class="vas-styleguide-theme-light"
  >
    <div :class="b('header')">
      <div :class="b('header-content')">
        <slot name="header"></slot>
      </div>
      <div
        v-if="!singleTheme && !isCompare"
        :class="b('theme-toggle')"
      >
        <e-vas-toggle
          v-model="darkMode"
          label="Dark mode"
        />
      </div>
    </div>
    <div :class="b('demo')">
      <slot
        v-if="singleTheme"
        name="demo"
      ></slot>

      <!-- Each pane gets its own form, so identically named radio groups in the compared panes
           don't end up in the same native radio group and deselect each other. The index is
           the key, so toggling patches the pane instead of re-creating the demo. -->
      <template v-else>
        <form
          v-for="(paneTheme, index) in themes"
          :key="index"
          :class="[b('demo-pane'), `vas-styleguide-theme-${paneTheme}`]"
          @submit.prevent
        >
          <span
            v-if="isCompare"
            :class="b('demo-pane-label')"
          >
            {{ paneTheme }}
          </span>
          <div :class="b('demo-pane-content')">
            <slot name="demo"></slot>
          </div>
        </form>
      </template>
    </div>
    <div :class="b('sidebar')">
      <div :class="b('sidebar-header')">Configuration</div>
      <slot name="sidebar"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import { VasSettingsStore, useVasSettingsStore } from '../stores/settings';
  import { DEMO_THEME_MODES, DemoThemeMode, vasDemoThemeModeKey } from './demo-theme-mode';

  type Setup = {
    settingsStore: VasSettingsStore;
  };

  type Data = {
    darkMode: boolean;
  };

  /**
   * A demo frame for components.
   *
   * The `demo` slot is rendered on the light theme by default. A "Dark mode" toggle at the right
   * of the header switches it to the dark theme (and back) on demand, so a styling change
   * can be checked on every theme. With `themeMode="compare"` the light and the dark theme
   * are rendered side by side instead. The default mode can be set globally by providing
   * `vasDemoThemeModeKey` or by the user in the settings; the `themeMode` prop overrides both per card.
   */
  export default defineComponent({
    name: 'c-vas-demo-card',

    components: { eVasToggle },

    inject: {
      globalThemeMode: {
        from: vasDemoThemeModeKey,
        default: 'toggle',
      },
    },

    props: {
      /**
       * `toggle` shows one pane with a "Dark mode" toggle, `compare` shows the light and the
       * dark theme side by side. Falls back to the stored "Demo card themes" setting, then the provided mode (`toggle` if none).
       */
      themeMode: {
        type: String as PropType<DemoThemeMode>,
        default: undefined,
        validator: (value: string): boolean => DEMO_THEME_MODES.includes(value as DemoThemeMode),
      },

      /**
       * If true, forces the configuration section to be placed above the demo section.
       */
      forceConfigurationTop: {
        type: Boolean,
        default: false,
      },

      /**
       * Renders the `demo` slot on the light theme only, without the theme toggle.
       * Use it for demos which bring their own theming.
       */
      singleTheme: {
        type: Boolean,
        default: false,
      },
    },
    // emits: {},

    setup(): Setup {
      return {
        settingsStore: useVasSettingsStore(),
      };
    },
    data(): Data {
      return {
        /**
         * Whether the demo is shown on the dark theme. Off (light) by default.
         */
        darkMode: false,
      };
    },

    computed: {
      /**
       * Returns the mode in effect: the prop, else the user's stored setting, else the
       * provided default.
       */
      resolvedThemeMode(): DemoThemeMode {
        return this.themeMode ?? this.settingsStore.state.demoThemeMode ?? (this.globalThemeMode as DemoThemeMode);
      },

      isCompare(): boolean {
        return this.resolvedThemeMode === 'compare';
      },

      /**
       * Returns the theme of every pane to render. Matches the `vas-styleguide-theme-*`
       * classes defined in `setup/scss/_themes.scss`.
       */
      themes(): ('light' | 'dark')[] {
        if (this.isCompare) {
          return ['light', 'dark'];
        }

        return [this.darkMode ? 'dark' : 'light'];
      },

      /**
       * Returns a configuration Object for modifier classes.
       *
       * The keys have to be kebab-case: the BEM plugin runs without `hyphenate`, so a
       * camelCase key would render as `--forceConfigurationTop` and never match the SCSS.
       */
      modifiers(): Modifiers {
        return {
          'force-configuration-top': this.forceConfigurationTop,
          'single-theme': this.singleTheme,
        };
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

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-vas-demo-card {
    $this: &;

    $content-padding: variables.$vas-spacing--16;

    border: 1px solid variables.$vas-theme-border-color;
    display: grid;
    grid-template-areas:
      'header'
      'sidebar'
      'demo';
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin: #{$content-padding * 2} 0;
    background-color: var(--vas-theme-background-content);
    border-radius: variables.$vas-theme-border-radius;

    @include mixins.media(sm) {
      grid-template-areas:
        'header header'
        'demo sidebar';
      grid-template-columns: 65% 35%;
    }

    &--force-configuration-top {
      grid-template-columns: 1fr;
      grid-template-areas:
        'header'
        'sidebar'
        'demo';

      #{$this}__sidebar {
        border-bottom: 1px solid variables.$vas-theme-border-color;
        border-left: none;
      }
    }

    &__header {
      grid-area: header;
      display: flex;
      flex-wrap: wrap;
      background-color: var(--vas-theme-background-surface);
      border-bottom: 1px solid variables.$vas-theme-border-color;
      color: variables.$vas-font-color--text;
      padding: $content-padding;
      gap: variables.$vas-spacing--10;
    }

    &__demo {
      grid-area: demo;
      padding: $content-padding;
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--10;

      @include mixins.media(sm) {
        flex-direction: row;
      }
    }

    // Without the theme panes the slot content keeps the centered single-column layout.
    &--single-theme &__demo {
      padding: #{$content-padding * 3} $content-padding;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    &__demo-pane {
      display: flex;
      flex: 1 1 0;
      flex-direction: column;
      gap: variables.$vas-spacing--8;
      min-width: 0;
      padding: $content-padding;
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-content);
      color: var(--vas-theme-text-color);
    }

    &__header-content {
      flex: 1 1 auto;
    }

    &__demo-pane-label {
      color: var(--vas-theme-text-color-muted);
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    &__theme-toggle {
      align-self: flex-start;
      margin-left: auto;
    }

    &__demo-pane-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: variables.$vas-spacing--10;
      padding: #{$content-padding * 2} 0;
      flex: 1 1 auto;

      // Demos often set a fixed width (e.g. 300px selects), which would overflow the pane.
      > * {
        max-width: 100%;
      }
    }

    &__sidebar {
      grid-area: sidebar;
      display: flex;
      flex-direction: column;
      background-color: var(--vas-theme-background-surface);
      border-bottom: 1px solid variables.$vas-theme-border-color;
      padding: $content-padding;
      gap: variables.$vas-spacing--10;

      @include mixins.media(sm) {
        border-left: 1px solid variables.$vas-theme-border-color;
        border-bottom: 0;
      }
    }

    &__sidebar-header {
      font-size: variables.$vas-theme-text-size-small;
      color: var(--vas-theme-text-color-muted);
      margin-bottom: variables.$vas-spacing--10;
    }
  }
</style>
