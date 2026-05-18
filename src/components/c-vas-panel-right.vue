<template>
  <c-vas-panel-base :class="b()">
    <template #top>
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
          :active="!showMenu"
          @click="showMenu = false"
        />
      </div>
    </template>

    <template #left>
      <c-vas-panel-action
        variant="icon"
        icon="i-text"
        tooltip="Navigation"
        tooltip-position="right"
        :active="showMenu"
        @click="showMenu = true"
      />

      <c-vas-panel-action
        :class="b('viewport')"
        variant="fluid-column"
        :text="viewport.currentViewport"
        :tooltip="viewPortTooltip"
        tooltip-position="right"
      />

      <c-vas-panel-action
        variant="icon"
        icon="i-key-cmd--filled"
        tooltip="Hotkeys"
        tooltip-position="right"
        @click="$emit('openHotkeysModal')"
      />
    </template>

    <template #content>
      <c-vas-navigation
        v-if="showMenu"
        :routes="router.options.routes"
      />
      <c-vas-config v-else>
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
    </template>

    <template #right></template>

    <template #bottom>
      <div :class="b('footer-bar')">
        <div>yolo</div>
        <c-vas-panel-action
          variant="fluid"
          icon="i-tag"
          :text="version"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </template>
  </c-vas-panel-base>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import packageJson from '../../package.json';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import { type Viewport, addViewportResizeEvent, removeViewportResizeEvent, useViewport } from '../plugins/viewport';
  import cVasConfig from './c-vas-config.vue';
  import cVasNavigation from './c-vas-navigation.vue';
  import cVasPanelAction from './c-vas-panel-action.vue';
  import cVasPanelBase from './c-vas-panel-base.vue';

  type Setup = {
    router: ReturnType<typeof useRouter>;
    version: string;
    githubUrl: string;
    viewport: Viewport;
  };

  type Data = {
    showMenu: boolean;
  };

  /**
   * Right-side panel containing navigation, settings, and footer for the main flyout.
   */
  export default defineComponent({
    name: 'c-vas-panel-right',
    components: {
      eVasIcon,
      cVasConfig,
      cVasNavigation,
      cVasPanelAction,
      cVasPanelBase,
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
      };
    },
    data(): Data {
      return {
        showMenu: true,
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

  .c-vas-panel-right {
    &__logo {
      display: flex;
      align-items: center;
      font-size: 12px;
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
        font-size: 12px;
        font-weight: bold;
        line-height: 1;
        aspect-ratio: 1;
      }
    }
  }
</style>
