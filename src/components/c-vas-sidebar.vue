<template>
  <div
    ref="container"
    :class="[b('', modifiers), theme]"
  >
    <c-vas-flyout
      :is-open="isMainFlyoutOpen"
      direction="right"
    >
      <template #controls>
        <c-vas-flyout-handle
          icon="i-page-setting"
          :is-open="isMainFlyoutOpen"
          :is-animated="isToggleButtonAnimated"
          @toggle="onToggleMainFlyout"
        />
      </template>

      <template #content>
        <c-vas-panel @open-hotkeys-modal="isHotkeysModalOpen = true">
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
        </c-vas-panel>
      </template>
    </c-vas-flyout>

    <c-vas-hotkey-modal :is-open="isHotkeysModalOpen" />
  </div>
</template>

<script lang="ts">
  import type { ComponentPublicInstance, Ref } from 'vue';
  import { defineComponent, ref } from 'vue';
  import type { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import { getPersistentItem } from '../stores/helper';
  import type { VasSessionStore } from '../stores/session';
  import { useVasSessionStore } from '../stores/session';
  import type { VasSettingsStore } from '../stores/settings';
  import { useVasSettingsStore } from '../stores/settings';
  import cVasFlyoutHandle from './c-vas-flyout-handle.vue';
  import cVasFlyout from './c-vas-flyout.vue';
  import cVasHotkeyModal from './c-vas-hotkey-modal.vue';
  import cVasPanel from './c-vas-panel.vue';

  const DOUBLE_SHIFT_DELAY_MS = 500;
  const PAGE_CONFIG_ANIMATION_DURATION_MS = 600;

  type KeyEvent = Event & {
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    key: string;
  };

  type Setup = {
    vasSessionStore: VasSessionStore;
    vasSettingsStore: VasSettingsStore;
    container: Ref<HTMLDivElement | null | undefined>;
    colorSchemeQuery: Ref<MediaQueryList | null>;
  };

  type Data = {
    isMainFlyoutOpen: boolean;
    isHotkeysModalOpen: boolean;
    lastShiftPress: number;
    isToggleButtonAnimated: boolean;
    animationTimeout: ReturnType<typeof setTimeout> | null;
    systemPrefersDark: boolean;
  };

  export default defineComponent({
    name: 'c-vas-sidebar',

    components: {
      cVasFlyoutHandle,
      cVasFlyout,
      cVasHotkeyModal,
      cVasPanel,
    },
    // props: {},

    // emits: {},

    setup(): Setup {
      return {
        vasSessionStore: useVasSessionStore(),
        vasSettingsStore: useVasSettingsStore(),
        container: ref(),
        colorSchemeQuery: ref(null),
      };
    },

    data(): Data {
      return {
        isMainFlyoutOpen: false,
        isHotkeysModalOpen: false,
        lastShiftPress: 0,
        isToggleButtonAnimated: false,
        animationTimeout: null,
        systemPrefersDark: false,
      };
    },
    computed: {
      isFlyoutOpen(): boolean {
        return this.isMainFlyoutOpen;
      },

      modifiers(): Modifiers {
        return {
          isFlyoutOpen: this.isFlyoutOpen,
        };
      },

      theme(): string {
        const theme = this.vasSettingsStore.state.theme;
        const resolved = theme === 'system' ? (this.systemPrefersDark ? 'dark' : 'light') : theme;

        return `vas-styleguide-theme-${resolved}`;
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

      '$route': function (to, from) {
        this.onCloseFlyout();

        if (from?.name) {
          this.vasSessionStore.addLastOpenedRoute(from);
        }
      },

      'vasSessionStore.state.hasPageConfig': {
        handler(value) {
          if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
            this.animationTimeout = null;
          }

          if (value) {
            this.isToggleButtonAnimated = true;

            this.animationTimeout = setTimeout(() => {
              this.isToggleButtonAnimated = false;
              this.animationTimeout = null;
            }, PAGE_CONFIG_ANIMATION_DURATION_MS);
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

      this.colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemPrefersDark = this.colorSchemeQuery.matches;
      this.colorSchemeQuery.addEventListener('change', this.handleColorSchemeChange);

      document.body.classList.toggle(
        'c-vas-html-validation--enabled',
        getPersistentItem<boolean>('html-validation', true),
      );
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('click', this.handleOutsideClick);
      document.removeEventListener('keydown', this.handleHotKeys);
      this.colorSchemeQuery?.removeEventListener('change', this.handleColorSchemeChange);

      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
    },
    // unmounted() {},

    errorCaptured(error: unknown, _instance: ComponentPublicInstance | null, info: string): boolean {
      // eslint-disable-next-line no-console
      console.error('[c-vas-sidebar] Caught child error — the sidebar stays functional:', error, info);

      return false; // Stop propagation; prevents crashing the host app.
    },

    methods: {
      handleColorSchemeChange(event: MediaQueryListEvent): void {
        this.systemPrefersDark = event.matches;
      },

      onCloseFlyout(): void {
        this.isMainFlyoutOpen = false;
        this.isHotkeysModalOpen = false;
      },

      onToggleMainFlyout(isMainFlyoutOpen?: boolean): void {
        this.isMainFlyoutOpen = isMainFlyoutOpen ?? !this.isMainFlyoutOpen;
      },

      handleOutsideClick(event: Event): void {
        if (!this.container?.contains(event.target as Node)) {
          this.onCloseFlyout();
        }
      },

      handleHotKeys(event: KeyEvent): void {
        // Detect double Shift.
        if (event.key === 'Shift') {
          const currentTime = Date.now();
          const timeSinceLastPress = currentTime - this.lastShiftPress;

          if (timeSinceLastPress > 0 && timeSinceLastPress < DOUBLE_SHIFT_DELAY_MS) {
            this.onToggleMainFlyout(!this.isMainFlyoutOpen);
            this.lastShiftPress = 0; // Reset.

            return;
          }

          this.lastShiftPress = currentTime;

          return;
        }

        // Reset the Shift timer on any other key press.
        this.lastShiftPress = 0;

        // ESC for all flyout.
        if (event.key === 'Escape') {
          event.preventDefault();
          this.onCloseFlyout();

          return;
        }

        // Hotkeys for the main flyout.
        if (event.metaKey && event.shiftKey && event.key === 'o') {
          event.preventDefault();
          this.onToggleMainFlyout();

          return;
        }

        if (event.metaKey && event.shiftKey && event.key === ':') {
          event.preventDefault();
          this.onToggleMainFlyout();

          return;
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:meta';
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  :where(.c-vas-sidebar) {
    @include meta.load-css('the-new-css-reset/css/reset');
  }

  .c-vas-sidebar {
    $this: &;
    $c-vas-sidebar--header-height: 40px;

    position: fixed;
    inset: 0;
    z-index: 999;
    width: 100%;
    height: 100vh;
    background-color: transparent;
    color: var(--vas-theme-text-color);
    transition: background-color variables.$vas-transition--default;
    font-size: variables.$vas-font-size--label;
    pointer-events: none;

    &--is-flyout-open {
      background-color: var(--vas-theme-overlay);
    }
  }
</style>
