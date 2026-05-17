<template>
  <c-vas-panel-base :class="b()">
    <template #top>
      <c-vas-panel-action
        variant="fluid"
        icon="i-text"
        :active="showMenu"
        @click="showMenu = true"
      >
        Navigation
      </c-vas-panel-action>
      <c-vas-panel-action
        variant="fluid"
        icon="i-cog-wheel"
        :active="!showMenu"
        @click="showMenu = false"
      >
        Settings
      </c-vas-panel-action>
    </template>
    <template #left>
      <c-vas-panel-action
        variant="icon"
        icon="i-key-cmd--filled"
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
      <div :class="b('status-bar')">
        <c-vas-viewport-info />
        <div :class="b('status-bar-end')">
          <c-vas-panel-action
            variant="fluid"
            icon="i-key-cmd--filled"
            @click="$emit('openHotkeysModal')"
          >
            Hotkeys
          </c-vas-panel-action>
          <c-vas-panel-action
            variant="fluid"
            icon="i-tag"
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ version }}
          </c-vas-panel-action>
        </div>
      </div>
    </template>
  </c-vas-panel-base>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import packageJson from '../../package.json';
  import cVasConfig from './c-vas-config.vue';
  import cVasNavigation from './c-vas-navigation.vue';
  import cVasPanelAction from './c-vas-panel-action.vue';
  import cVasPanelBase from './c-vas-panel-base.vue';
  import cVasViewportInfo from './c-vas-viewport-info.vue';

  type Setup = {
    router: ReturnType<typeof useRouter>;
    version: string;
    githubUrl: string;
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
      cVasConfig,
      cVasNavigation,
      cVasPanelAction,
      cVasPanelBase,
      cVasViewportInfo,
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
      };
    },
    data(): Data {
      return {
        showMenu: true,
      };
    },

    // computed: {},
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
  @use '../setup/scss/variables';

  .c-vas-panel-right {
    &__status-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 28px;
      background-color: var(--vas-theme-footer-bg);
      border-top: 1px solid var(--vas-theme-border-color);
      font-size: variables.$vas-font-size--12;
    }

    &__status-bar-end {
      display: flex;
      align-items: center;
    }
  }
</style>
