<template>
  <div :class="b()">
    <div :class="b('slot', { top: true })">
      <div :class="b('top-bar')">
        <div :class="b('logo')">
          <e-vas-icon
            icon="i-vuejs"
            size="16"
          />
          styleguide
        </div>

        <c-vas-panel-action
          variant="icon"
          icon="i-cog-wheel"
          tooltip="Settings"
          tooltip-position="bottom"
          :active="activePanel === 'settings'"
          @click="activePanel = 'settings'"
        />
      </div>
    </div>

    <div :class="b('slot', { left: true })">
      <div :class="b('elements-container', { column: true })">
        <c-vas-panel-action
          variant="icon"
          icon="i-folder"
          tooltip="Navigation"
          tooltip-position="right"
          :active="activePanel === 'navigation'"
          @click="activePanel = 'navigation'"
        />

        <c-vas-panel-action
          variant="icon"
          icon="i-control-alt"
          tooltip="Global Configuration"
          tooltip-position="right"
          :active="activePanel === 'globalConfig'"
          @click="activePanel = 'globalConfig'"
        />

        <c-vas-panel-action
          variant="icon"
          icon="i-control"
          tooltip="Page Configuration"
          tooltip-position="right"
          :active="activePanel === 'pageConfig'"
          :disabled="!vasSessionStore.state.hasPageConfig"
          :badge="vasSessionStore.state.hasPageConfig"
          :highlighted="vasSessionStore.state.hasPageConfig"
          @click="activePanel = 'pageConfig'"
        />

        <c-vas-panel-action
          :class="b('viewport')"
          variant="fluid-column"
          :text="viewport.currentViewport"
          :tooltip="viewPortTooltip"
          tooltip-position="right"
        />
      </div>

      <div :class="b('elements-container', { column: true })">
        <c-vas-panel-action
          variant="icon"
          icon="i-key-cmd--filled"
          tooltip="Hotkeys"
          tooltip-position="right"
          @click="$emit('openHotkeysModal')"
        />
      </div>
    </div>

    <div :class="b('content')">
      <c-vas-navigation
        v-if="activePanel === 'navigation'"
        :routes="router.options.routes"
      />

      <c-vas-settings v-else-if="activePanel === 'settings'" />

      <c-vas-config v-else-if="activePanel === 'globalConfig'">
        <template
          v-if="$slots.globalSettings"
          #globalSettings
        >
          <slot name="globalSettings"></slot>
        </template>
        <template
          v-if="$slots.customSettings"
          #customSettings
        >
          <slot name="customSettings"></slot>
        </template>
      </c-vas-config>

      <div
        v-show="activePanel === 'pageConfig'"
        id="teleportDestinationPageConfigFlyout"
      ></div>
    </div>

    <div :class="b('slot', { right: true })"></div>

    <div :class="b('slot', { bottom: true })">
      <div :class="b('footer-bar')">
        <c-vas-tips />
        <c-vas-panel-action
          variant="fluid"
          icon="i-tag"
          :text="version"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import packageJson from '../../package.json';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import { type Viewport, addViewportResizeEvent, removeViewportResizeEvent, useViewport } from '../plugins/viewport';
  import { type VasSessionStore, useVasSessionStore } from '../stores/session';
  import cVasConfig from './c-vas-config.vue';
  import cVasNavigation from './c-vas-navigation.vue';
  import cVasPanelAction from './c-vas-panel-action.vue';
  import cVasSettings from './c-vas-settings.vue';
  import cVasTips from './c-vas-tips.vue';

  type ActivePanel = 'navigation' | 'settings' | 'config' | 'globalConfig' | 'pageConfig';

  type Setup = {
    router: ReturnType<typeof useRouter>;
    version: string;
    githubUrl: string;
    viewport: Viewport;
    vasSessionStore: VasSessionStore;
  };

  type Data = {
    activePanel: ActivePanel;
  };

  /**
   * Main styleguide panel with navigation, settings, and footer.
   */
  export default defineComponent({
    name: 'c-vas-panel',
    components: {
      eVasIcon,
      cVasConfig,
      cVasSettings,
      cVasNavigation,
      cVasPanelAction,
      cVasTips,
    },

    // props: {},
    emits: {
      openHotkeysModal: () => true,
    },

    setup(): Setup {
      return {
        router: useRouter(),
        version: packageJson.version,
        githubUrl: `${packageJson.repository.tree}${packageJson.version}`,
        viewport: useViewport(),
        vasSessionStore: useVasSessionStore(),
      };
    },
    data(): Data {
      return {
        activePanel: 'navigation',
      };
    },

    computed: {
      viewPortTooltip(): string {
        return `Viewport: ${this.viewport.viewportWidth}w / ${this.viewport.viewportHeight}h`;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      addViewportResizeEvent();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      removeViewportResizeEvent();
    },
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-panel {
    $bar-size: variables.$vas-theme-panel-bar-size;

    background-color: var(--vas-theme-background-container);
    display: grid;
    grid-template-areas:
      'top top top'
      'left content right'
      'bottom bottom bottom';
    grid-template-columns: $bar-size 1fr $bar-size;
    grid-template-rows: $bar-size 1fr $bar-size;
    width: 100%;
    height: 100%;
    color: var(--vas-theme-text-color);

    &__slot {
      display: flex;
      gap: variables.$vas-theme-panel-spacing-between-elements;

      &--top {
        grid-area: top;
      }

      &--bottom {
        grid-area: bottom;
      }

      &--top,
      &--bottom {
        width: 100%;
        padding: 4px;
      }

      &--left {
        grid-area: left;
        justify-content: space-between;
      }

      &--right {
        grid-area: right;
      }

      &--left,
      &--right {
        flex-direction: column;
        padding: 6px 4px;
        height: 100%;
      }
    }

    &__content {
      grid-area: content;
      background-color: var(--vas-theme-background-content);
      border-radius: 6px;
      padding: 10px;
      min-height: 0;
      overflow: hidden auto;
    }

    &__logo {
      display: flex;
      align-items: center;
      font-size: variables.$vas-font-size--small;
      gap: 4px;
      padding-left: 5px;
      font-weight: bold;
    }

    &__top-bar,
    &__footer-bar {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__viewport {
      .c-vas-panel-action {
        padding: 2px 0;
        text-transform: uppercase !important; // stylelint-disable-line declaration-no-important
        font-size: variables.$vas-font-size--small;
        font-weight: bold;
        line-height: 1;
        aspect-ratio: 1;
      }
    }

    &__elements-container {
      display: flex;
      gap: variables.$vas-theme-panel-spacing-between-elements;

      &--column {
        flex-direction: column;
      }
    }
  }
</style>
