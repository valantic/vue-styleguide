<template>
  <div
    :class="b(modifiers)"
    class="vas-styleguide-theme-light"
  >
    <div :class="b('header')">
      <slot name="header"></slot>
    </div>
    <div :class="b('demo')">
      <slot
        v-if="singleTheme"
        name="demo"
      ></slot>

      <!-- Each theme gets its own form, so identically named radio groups in the two panes
           don't end up in the same native radio group and deselect each other. -->
      <template v-else>
        <form
          v-for="theme in THEMES"
          :key="theme"
          :class="[b('demo-pane', { theme }), `vas-styleguide-theme-${theme}`]"
          @submit.prevent
        >
          <span :class="b('demo-pane-label')">{{ theme }}</span>
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
  import { defineComponent } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};

  type Data = {
    THEMES: string[];
  };

  /**
   * A demo frame for components.
   *
   * The `demo` slot is rendered once per theme, side by side, so a styling change can be
   * checked on the light and the dark theme at the same time. Both copies are bound to the
   * same state, which means the controls in the `sidebar` slot drive both panes at once.
   */
  export default defineComponent({
    name: 'c-vas-demo-card',

    // components: {},

    props: {
      /**
       * If true, forces the configuration section to be placed above the demo section.
       */
      forceConfigurationTop: {
        type: Boolean,
        default: false,
      },

      /**
       * Renders the `demo` slot only once, on the light theme, instead of one pane per theme.
       * Use it for demos which bring their own theming or which must not exist twice on the
       * page (e.g. anything driving a global, page-wide state).
       */
      singleTheme: {
        type: Boolean,
        default: false,
      },
    },
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        /**
         * The themes to render the demo slot for. Matches the `vas-styleguide-theme-*`
         * classes defined in `setup/scss/_themes.scss`.
         */
        THEMES: ['light', 'dark'],
      };
    },

    computed: {
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

    &__demo-pane-label {
      color: var(--vas-theme-text-color-muted);
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    &__demo-pane-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: variables.$vas-spacing--10;
      padding: #{$content-padding * 2} 0;
      flex: 1 1 auto;

      // Demos often set a fixed width (e.g. 300px selects), which would overflow the now
      // half-width pane.
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
