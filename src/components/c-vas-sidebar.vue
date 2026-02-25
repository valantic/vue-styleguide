<template>
  <div
    ref="container"
    :class="b('', modifiers)"
  >
    <c-vas-flyout :is-open="isPageConfigFlyoutOpen">
      <template #controls>
        <div :class="b('actions')">
          <c-vas-flyout-toggle-button
            :active="isPageConfigFlyoutOpen"
            icon="i-page-setting"
            @click="onTogglePageConfigFlyout()"
          />
        </div>
      </template>
      <div :class="b('page-config-flyout-content')">
        <c-vas-icon-headline
          :class="b('header')"
          icon="i-page-setting"
          text="Page Configuration"
        />
        <div
          id="teleportDestinationPageConfigFlyout"
          :class="b('content-wrapper', { pageConfig: true })"
        ></div>
      </div>
    </c-vas-flyout>

    <c-vas-flyout
      :is-open="isMainFlyoutOpen"
      direction="right"
    >
      <template #controls>
        <c-vas-viewport-info :is-open="isMainFlyoutOpen" />

        <div :class="b('actions')">
          <c-vas-flyout-toggle-button
            :active="showConfig && isMainFlyoutOpen"
            icon="i-cog-wheel"
            @click="onToggleMainFlyout(false, true)"
          />
          <c-vas-flyout-toggle-button
            :active="showMenu && isMainFlyoutOpen"
            icon="i-text"
            @click="onToggleMainFlyout(true)"
          />
        </div>
      </template>

      <c-vas-icon-headline
        :class="b('header')"
        icon="i-vuejs"
        text="Styleguide"
      />

      <div :class="b('tabs')">
        <e-vas-toggle-button
          :active="showMenu"
          @click="onToggleMainFlyout(true)"
        >
          <e-vas-icon
            icon="i-text"
            size="20"
          />
          Menu
        </e-vas-toggle-button>

        <e-vas-toggle-button
          :active="showConfig"
          @click="onToggleMainFlyout(false, true)"
        >
          <e-vas-icon
            icon="i-cog-wheel"
            size="20"
          />
          Settings
        </e-vas-toggle-button>
      </div>

      <div :class="b('content-wrapper')">
        <c-vas-navigation
          v-if="showMenu"
          :routes="router.options.routes"
        />
        <c-vas-config v-else>
          <template
            v-if="$slots.customSettings"
            #customSettings
          >
            <slot name="customSettings"></slot>
          </template>
        </c-vas-config>
      </div>
      <div :class="b('footer')">
        <button
          :class="b('hotkeys')"
          type="button"
          @click="isHotkeysModalOpen = true"
        >
          <e-vas-icon
            icon="i-key-cmd--filled"
            size="12"
          />
          Hotkeys
        </button>
        <a
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          :class="b('github-link')"
        >
          <e-vas-icon
            icon="i-tag"
            size="12"
          />
          {{ version }}
        </a>
      </div>
    </c-vas-flyout>

    <c-vas-hotkey-modal :is-open="isHotkeysModalOpen" />
  </div>
</template>

<script lang="ts">
  import { Ref, defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import packageJson from '../../package.json';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import eVasToggleButton from '../elements/e-vas-toggle-button.vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import cVasConfig from './c-vas-config.vue';
  import cVasFlyoutToggleButton from './c-vas-flyout-toggle-button.vue';
  import cVasFlyout from './c-vas-flyout.vue';
  import cVasHotkeyModal from './c-vas-hotkey-modal.vue';
  import cVasIconHeadline from './c-vas-icon-headline.vue';
  import cVasNavigation from './c-vas-navigation.vue';
  import cVasViewportInfo from './c-vas-viewport-info.vue';

  type KeyEvent = Event & {
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    key: string;
  };

  type Setup = {
    router: ReturnType<typeof useRouter>;
    container: Ref<HTMLDivElement | null | undefined>;
    version: string;
    githubUrl: string;
  };

  type Data = {
    isMainFlyoutOpen: boolean;
    isPageConfigFlyoutOpen: boolean;
    showMenu: boolean;
    showConfig: boolean;
    isHotkeysModalOpen: boolean;
  };

  export default defineComponent({
    name: 'c-vas-sidebar',

    components: {
      eVasToggleButton,
      cVasFlyoutToggleButton,
      cVasViewportInfo,
      cVasFlyout,
      cVasHotkeyModal,
      eVasIcon,
      cVasIconHeadline,
      cVasNavigation,
      cVasConfig,
    },
    // props: {},

    // emits: {},

    setup(): Setup {
      return {
        router: useRouter(),
        container: ref(),
        version: packageJson.version,
        githubUrl: `${packageJson.repository.tree}${packageJson.version}`,
      };
    },

    data(): Data {
      return {
        isMainFlyoutOpen: false,
        isPageConfigFlyoutOpen: false,
        showMenu: false,
        showConfig: false,
        isHotkeysModalOpen: false,
      };
    },
    computed: {
      isFlyoutOpen(): boolean {
        return this.isMainFlyoutOpen || this.isPageConfigFlyoutOpen;
      },

      modifiers(): Modifiers {
        return {
          isFlyoutOpen: this.isFlyoutOpen,
        };
      },
    },
    watch: {
      isFlyoutOpen() {
        if (this.isFlyoutOpen) {
          document.addEventListener('click', this.handleOutsideClick);
        } else {
          document.removeEventListener('click', this.handleOutsideClick);
        }
      },

      $route() {
        this.onCloseFlyout();
      },
    },
    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      document.addEventListener('keydown', this.handleHotKeys);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('click', this.handleOutsideClick);
      document.removeEventListener('keydown', this.handleHotKeys);
    },
    // unmounted() {},

    methods: {
      onCloseFlyout(): void {
        this.isMainFlyoutOpen = false;
        this.isPageConfigFlyoutOpen = false;
        this.isHotkeysModalOpen = false;
      },

      onToggleMainFlyout(
        showMenu: boolean = false,
        showConfig: boolean = false,
        isMainFlyoutOpen: boolean = true,
      ): void {
        this.isMainFlyoutOpen = isMainFlyoutOpen;
        this.showMenu = showMenu;
        this.showConfig = showConfig;
      },

      onTogglePageConfigFlyout(): void {
        this.isPageConfigFlyoutOpen = !this.isPageConfigFlyoutOpen;
      },

      handleOutsideClick(event: Event): void {
        if (!this.container?.contains(event.target as Node)) {
          this.onCloseFlyout();
        }
      },

      handleHotKeys(event: KeyEvent): void {
        // ESC for all flyout.
        if (event.key === 'Escape') {
          event.preventDefault();
          this.onCloseFlyout();

          return;
        }

        // Hotkeys for main flyout.
        if (event.metaKey && event.shiftKey && event.key === 'o') {
          event.preventDefault();
          const openFlyout = !this.isMainFlyoutOpen || !this.showMenu;

          this.onToggleMainFlyout(true, false, openFlyout);

          return;
        }

        if (event.metaKey && event.shiftKey && event.key === ':') {
          event.preventDefault();
          const openFlyout = !this.isMainFlyoutOpen || !this.showConfig;

          this.onToggleMainFlyout(false, true, openFlyout);

          return;
        }

        // Hotkeys for page config flyout.
        if (event.metaKey && event.shiftKey && event.key === ';') {
          event.preventDefault();
          this.onTogglePageConfigFlyout();

          return;
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  .c-vas-sidebar {
    $this: &;
    $c-vas-sidebar--button-size: 40px;

    position: fixed;
    inset: 0;
    z-index: 999;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    background-color: rgba(variables.$vas-color-grayscale--0, 0);
    transition: background-color variables.$vas-transition--default;

    &--is-flyout-open {
      background-color: rgba(variables.$vas-color-grayscale--0, 0.25);
    }

    &__header {
      background-color: rgba(variables.$vas-color-green-vue, 0.1);
      height: 40px;
    }

    &__content-wrapper {
      padding: variables.$vas-spacing--12;

      &--page-config {
        display: flex;
        flex-direction: column;
        gap: variables.$vas-spacing--10;
      }
    }

    &__tabs {
      display: flex;
      margin-bottom: 10px;
      padding: variables.$vas-spacing--10 variables.$vas-spacing--6 0 variables.$vas-spacing--10;
      border-bottom: 1px solid variables.$vas-color-grayscale--500;

      .e-vas-toggle-button {
        border-radius: 0;
      }
    }

    &__footer {
      margin-top: auto;
      background-color: rgba(variables.$vas-color-green-vue, 0.1);
      width: 100%;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--16;
      font-size: variables.$vas-font-size--12;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
    }

    &__github-link {
      display: flex;
      align-items: center;
      gap: variables.$vas-spacing--6;

      .e-vas-icon {
        transform: scaleX(-1);
      }
    }

    &__hotkeys {
      display: flex;
      align-items: center;
      gap: variables.$vas-spacing--6;
      padding: variables.$vas-spacing--4;
      border: 1px solid variables.$vas-color-grayscale--400;
      border-radius: 2px;
      background-color: rgba(variables.$vas-color-grayscale--1000, 0);
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: rgba(variables.$vas-color-grayscale--1000, 0.4);
      }
    }
  }
</style>
