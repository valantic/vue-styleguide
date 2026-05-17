<template>
  <div
    ref="container"
    class="vas-styleguide-reset"
    :class="[b('', modifiers), themeClass]"
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
        <c-vas-icon-headline
          :class="b('header')"
          icon="i-page-setting"
          text="Page Configuration"
        />
        <div
          id="teleportDestinationPageConfigFlyout"
          :class="b('content-wrapper')"
        ></div>
      </template>
    </c-vas-flyout>

    <c-vas-flyout
      :is-open="isMainFlyoutOpen"
      direction="right"
    >
      <template #controls>
        <div
          v-show="!isMainFlyoutOpen"
          :class="b('actions')"
        >
          <c-vas-flyout-toggle-button
            :active="isMainFlyoutOpen"
            icon="i-cog-wheel"
            @click="onToggleMainFlyout()"
          />
          <c-vas-flyout-toggle-button
            :active="isMainFlyoutOpen"
            icon="i-text"
            @click="onToggleMainFlyout()"
          />
        </div>
      </template>

      <template #content>
        <c-vas-panel-right @open-hotkeys-modal="isHotkeysModalOpen = true">
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
        </c-vas-panel-right>
      </template>
    </c-vas-flyout>

    <c-vas-hotkey-modal :is-open="isHotkeysModalOpen" />
  </div>
</template>

<script lang="ts">
  import type { Ref } from 'vue';
  import { defineComponent, ref } from 'vue';
  import type { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import type { VasSessionStore } from '../stores/session';
  import { useVasSessionStore } from '../stores/session';
  import type { VasSettingsStore } from '../stores/settings';
  import { useVasSettingsStore } from '../stores/settings';
  import cVasFlyoutToggleButton from './c-vas-flyout-toggle-button.vue';
  import cVasFlyout from './c-vas-flyout.vue';
  import cVasHotkeyModal from './c-vas-hotkey-modal.vue';
  import cVasIconHeadline from './c-vas-icon-headline.vue';
  import cVasPanelRight from './c-vas-panel-right.vue';

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
  };

  type Data = {
    isMainFlyoutOpen: boolean;
    isPageConfigFlyoutOpen: boolean;
    isHotkeysModalOpen: boolean;
    lastShiftPress: number;
    isToggleButtonAnimated: boolean;
    animationTimeout: ReturnType<typeof setTimeout> | null;
  };

  export default defineComponent({
    name: 'c-vas-sidebar',

    components: {
      cVasFlyoutToggleButton,
      cVasFlyout,
      cVasHotkeyModal,
      cVasIconHeadline,
      cVasPanelRight,
    },
    // props: {},

    // emits: {},

    setup(): Setup {
      return {
        vasSessionStore: useVasSessionStore(),
        vasSettingsStore: useVasSettingsStore(),
        container: ref(),
      };
    },

    data(): Data {
      return {
        isMainFlyoutOpen: false,
        isPageConfigFlyoutOpen: false,
        isHotkeysModalOpen: false,
        lastShiftPress: 0,
        isToggleButtonAnimated: false,
        animationTimeout: null,
      };
    },
    computed: {
      isFlyoutOpen(): boolean {
        return this.isMainFlyoutOpen || this.isPageConfigFlyoutOpen;
      },

      themeClass(): string {
        return `vas-theme--${this.vasSettingsStore.state.theme}`;
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

      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
    },
    // unmounted() {},

    methods: {
      onCloseFlyout(): void {
        this.isMainFlyoutOpen = false;
        this.isPageConfigFlyoutOpen = false;
        this.isHotkeysModalOpen = false;
      },

      onToggleMainFlyout(isMainFlyoutOpen: boolean = !this.isMainFlyoutOpen): void {
        this.isMainFlyoutOpen = isMainFlyoutOpen;
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
  @use 'sass:meta';
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  :where(.vas-styleguide-reset) {
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
    pointer-events: none;
    background-color: transparent;
    color: var(--vas-theme-text-color);
    transition: background-color variables.$vas-transition--default;
    font-size: variables.$vas-font-size--16;

    &--is-flyout-open {
      background-color: var(--vas-theme-overlay);
    }

    &__header {
      flex: 0 0 auto;
      background-color: var(--vas-theme-border-color);
      height: $c-vas-sidebar--header-height;
      position: sticky;
      top: 0;
      z-index: 5;
    }

    &__content-wrapper {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--10;
      overflow-y: auto;
      padding: 0 variables.$vas-spacing--12 variables.$vas-spacing--12;
    }

    &__actions {
      pointer-events: auto;
    }
  }
</style>
