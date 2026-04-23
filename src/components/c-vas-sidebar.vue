<template>
  <div
    ref="container"
    class="vas-styleguide-reset"
    :class="b('', modifiers)"
  >
    <c-vas-flyout
      :is-open="isPageConfigFlyoutOpen"
      :is-opaque="isToggleButtonAnimated"
    >
      <template #controls>
        <div :class="b('actions')">
          <c-vas-flyout-toggle-button
            :active="isPageConfigFlyoutOpen"
            :is-animated="isToggleButtonAnimated"
            icon="i-page-setting"
            @click="onTogglePageConfigFlyout()"
          />
        </div>
      </template>
      <template #content>
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
      </template>
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

      <template
        v-if="isMainFlyoutOpen"
        #content
      >
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
        </div>
        <div :class="b('footer')">
          <div
            v-if="vasSessionStore.state.lastOpenedRoutes.length"
            :class="b('footer-row')"
          >
            <div :class="b('last-opened-label')">Last opened:</div>
            <div :class="b('last-opened-wrapper')">
              <button
                v-for="routeItem in vasSessionStore.state.lastOpenedRoutes"
                :key="routeItem.name"
                :class="b('last-opened-item')"
                :title="routeItem.meta?.title"
                type="button"
                @click="onNavigateToRoute(routeItem)"
              >
                {{ (routeItem.meta?.title as string)?.substring(0, 3) }}
              </button>
            </div>
          </div>
          <div :class="b('footer-row')">
            <div :class="b('footer-info-wrapper')">
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
          </div>
        </div>
      </template>
    </c-vas-flyout>

    <c-vas-hotkey-modal :is-open="isHotkeysModalOpen" />
  </div>
</template>

<script lang="ts">
  import type { Ref } from 'vue';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import type { RouteRecordRaw } from 'vue-router';
  import packageJson from '../../package.json';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import eVasToggleButton from '../elements/e-vas-toggle-button.vue';
  import type { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import type { VasSessionStore } from '../stores/session';
  import { useVasSessionStore } from '../stores/session';
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
    vasSessionStore: VasSessionStore;
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
    lastShiftPress: number;
    isToggleButtonAnimated: boolean;
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
        vasSessionStore: useVasSessionStore(),
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
        lastShiftPress: 0,
        isToggleButtonAnimated: false,
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
      'isFlyoutOpen': function () {
        if (this.isFlyoutOpen) {
          document.addEventListener('click', this.handleOutsideClick);
        } else {
          document.removeEventListener('click', this.handleOutsideClick);
        }
      },

      '$route': function (route) {
        this.onCloseFlyout();
        this.vasSessionStore.addLastOpenedRoute(route);
      },

      'vasSessionStore.state.hasPageConfig': {
        handler(value) {
          if (value) {
            this.isToggleButtonAnimated = true;

            setTimeout(() => {
              this.isToggleButtonAnimated = false;
            }, 600);
          }
        },
        immediate: true,
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
        const doublePressDelay = 500;

        // Detect double Shift.
        if (event.key === 'Shift') {
          const currentTime = Date.now();
          const timeSinceLastPress = currentTime - this.lastShiftPress;

          if (timeSinceLastPress > 0 && timeSinceLastPress < doublePressDelay) {
            this.onToggleMainFlyout(true, false, !this.isMainFlyoutOpen);
            this.lastShiftPress = 0; // Reset.

            return;
          }

          this.lastShiftPress = currentTime;

          return;
        }

        // Reset Shift timer on any other key press.
        this.lastShiftPress = 0;

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

      onNavigateToRoute(route: RouteRecordRaw): void {
        this.router.push({
          name: route.name as string,
          params: route.meta?.params as Record<string, string>,
          query: route.meta?.query as Record<string, string | (string | null)[] | null>,
        });
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:meta';
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  :where(.vas-styleguide-reset) {
    @include meta.load-css('the-new-css-reset/css/reset');
  }

  .c-vas-sidebar {
    $this: &;
    $c-vas-sidebar--button-size: 40px;
    $c-vas-sidebar--header-height: 40px;

    position: fixed;
    inset: 0;
    z-index: 999;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    background-color: rgba(variables.$vas-color-grayscale--0, 0);
    transition: background-color variables.$vas-transition--default;
    font-size: variables.$vas-font-size--16;

    &--is-flyout-open {
      background-color: rgba(variables.$vas-color-grayscale--0, 0.25);
    }

    &__header {
      flex: 0 0 auto;
      background-color: variables.$vas-color-grayscale--600;
      height: $c-vas-sidebar--header-height;
      position: sticky;
      top: 0;
      z-index: 5;
    }

    &__content-wrapper {
      padding: variables.$vas-spacing--12;
      overflow-y: auto;
      padding-top: 0;

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
      position: sticky;
      top: $c-vas-sidebar--header-height;
      z-index: 5;
      background-color: variables.$vas-color-grayscale--1000;

      .e-vas-toggle-button {
        border-radius: 0;
        font-size: variables.$vas-font-size--12;
      }
    }

    &__footer {
      margin-top: auto;
      background-color: rgba(variables.$vas-color-green-vue, 0.1);
      width: 100%;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--16;
      font-size: variables.$vas-font-size--12;
      display: flex;
      flex-direction: column;
    }

    &__footer-info-wrapper {
      flex: 0 0 auto;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }

    &__last-opened-wrapper {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: variables.$vas-spacing--4;
      width: 100%;
      margin-bottom: variables.$vas-spacing--8;
    }

    &__last-opened-label {
      padding-bottom: variables.$vas-spacing--2;
    }

    &__last-opened-item {
      background: variables.$vas-color-white;
      border: 1px variables.$vas-color-grayscale--500 solid;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      color: inherit;
      font-family: inherit;
      font-size: inherit;

      &:hover {
        background-color: variables.$vas-color-grayscale--900;
      }
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

    &__actions {
      pointer-events: auto;
    }
  }
</style>
