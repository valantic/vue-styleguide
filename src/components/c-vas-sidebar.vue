<template>
  <div
    ref="container"
    :class="b('', modifiers)"
  >
    <div :class="b('viewport', { open: isOpen })">
      {{ $viewport.currentViewport }}
    </div>

    <button
      :class="b('float-button', { menu: true, active: showMenu && isOpen })"
      type="button"
      @click="onToggleSidebar(true)"
    >
      <span></span>
    </button>
    <button
      :class="b('float-button', { config: true, active: showConfig && isOpen })"
      type="button"
      @click="onToggleSidebar(false, true)"
    >
      <span></span>
    </button>

    <div :class="b('wrapper')">
      <div :class="b('header')">
        <a
          :class="b('header-link')"
          href="https://www.valantic.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            :class="b('header-logo')"
            src="../assets/valantic.svg"
            alt="valantic"
          />
          <span :class="b('header-slogan')">Styleguide</span>
        </a>
      </div>
      <ul :class="b('tabs')">
        <li
          :class="b('tab-item', { active: showMenu })"
          @click="onToggleSidebar(true)"
        >
          <span :class="b('tab-item-icon', { menu: true })"></span>
        </li>
        <li
          :class="b('tab-item', { active: showConfig })"
          @click="onToggleSidebar(false, true)"
        >
          <span :class="b('tab-item-icon', { config: true })"></span>
        </li>
      </ul>

      <section v-if="showMenu">
        <div :class="b('section-header')">Menu</div>
        <c-vas-sidebar-navigation />
      </section>

      <section v-else>
        <div :class="b('section-header')">Settings</div>
        <c-vas-sidebar-config />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType, Ref, defineComponent, ref } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import { useVasSettingsStore } from '../stores/settings';
  import { StyleguideSettings } from '../types/settings';
  import cVasSidebarConfig from './c-vas-sidebar-config.vue';
  import cVasSidebarNavigation from './c-vas-sidebar-navigation.vue';

  type KeyEvent = Event & {
    ctrlKey: boolean;
    key: string;
  };

  type Setup = {
    container: Ref<HTMLDivElement | null | undefined>;
    vasSettingsStore: ReturnType<typeof useVasSettingsStore>;
  };

  type Data = {
    isOpen: boolean;
    showMenu: boolean;
    showConfig: boolean;
  };

  export default defineComponent({
    name: 'c-vas-sidebar',

    components: {
      cVasSidebarNavigation,
      cVasSidebarConfig,
    },
    props: {
      /**
       * Settings for the styleguide.
       */
      settings: {
        type: Object as PropType<StyleguideSettings>,
        required: true,
      },
    },

    emits: {
      updateTheme: (theme: string) => typeof theme === 'string',
      updateLanguage: (language: string) => typeof language === 'string',
    },

    setup(): Setup {
      return {
        container: ref(),
        vasSettingsStore: useVasSettingsStore(),
      };
    },

    data(): Data {
      return {
        isOpen: false,
        showMenu: false,
        showConfig: false,
      };
    },
    computed: {
      modifiers(): Modifiers {
        return {
          open: this.isOpen,
        };
      },
    },
    watch: {
      isOpen() {
        if (this.isOpen) {
          document.addEventListener('click', this.handleOutsideClick);
        } else {
          document.removeEventListener('click', this.handleOutsideClick);
        }
      },
    },
    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      window.addEventListener('keydown', this.handleHotKeys);

      this.vasSettingsStore.initialize(this.settings);
      this.vasSettingsStore.watchChanges((key, value) => {
        const eventMap = {
          theme: 'updateTheme',
          language: 'updateLanguage',
        } as const;

        if (key in eventMap) {
          // @ts-ignore - Vue event typing via emit.
          this.$emit(eventMap[key], value);
        }
      });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('click', this.handleOutsideClick);
      window.removeEventListener('keydown', this.handleHotKeys);
    },
    // unmounted() {},

    methods: {
      onToggleSidebar(showMenu: boolean = false, showConfig: boolean = false, isOpen: boolean = true): void {
        this.isOpen = isOpen;
        this.showMenu = showMenu;
        this.showConfig = showConfig;
      },

      /**
       * Hides the overlay if the user clicks somewhere else than inside the container.
       */
      handleOutsideClick(event: Event): void {
        if (!this.container?.contains(event.target as Node)) {
          this.onToggleSidebar(false, false, false);
        }
      },

      handleHotKeys(event: KeyEvent): void {
        // Check if both Control and O keys are pressed
        if (event.ctrlKey && event.key === 'o') {
          event.preventDefault();
          this.onToggleSidebar(true, false, !this.isOpen);
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-sidebar {
    $this: &;
    $c-vas-sidebar--button-size: 40px;
    $c-vas-sidebar--sidebar-width: 320px;

    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    width: 0;
    height: 100vh;

    &--open {
      #{$this}__wrapper {
        display: block;
        width: $c-vas-sidebar--sidebar-width;
        overflow: auto;
        border-left: 10px solid variables.$vas-color-grayscale--400;
      }

      #{$this}__viewport,
      #{$this}__float-button {
        right: $c-vas-sidebar--sidebar-width - 10px;
        opacity: 1;
      }
    }

    &__float-button {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 2;
      width: $c-vas-sidebar--button-size;
      height: $c-vas-sidebar--button-size;
      opacity: 0.2;
      border: 1px solid variables.$vas-color-grayscale--400;
      background-color: variables.$vas-color-grayscale--1000;
      background-repeat: no-repeat;
      background-position: center;
      background-size: $c-vas-sidebar--button-size - 15px;
      cursor: pointer;

      &--menu {
        bottom: 0;
        background-image: url('../assets/text.svg');
      }

      &--config {
        bottom: $c-vas-sidebar--button-size - 1px;
        background-image: url('../assets/cog-wheel.svg');
      }

      &--active {
        opacity: 1;
        background-color: variables.$vas-color-grayscale--400;
      }

      &:hover {
        opacity: 0.9;
        background-color: variables.$vas-color-grayscale--500;
      }
    }

    &__wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: none;
      width: 0;
      height: 100%;
      padding: 12px;
      background-color: variables.$vas-color-grayscale--1000;
      font-family: variables.$vas-font-family--primary;
    }

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
    }

    &__header-link {
      position: relative;
    }

    &__header-logo {
      width: 160px;
    }

    &__header-slogan {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      color: variables.$vas-color-grayscale--0;
      font-size: 10px;
      text-align: center;
    }

    &__viewport {
      position: absolute;
      right: 0;
      z-index: 2;
      display: flex;
      gap: 5px;
      align-items: center;
      padding: 2px 10px;
      opacity: 0.2;
      background: variables.$vas-color-grayscale--400;
      color: variables.$vas-color-grayscale--0;
    }

    &__section-header {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    &__tabs {
      display: flex;
      margin-bottom: 10px;
      border-bottom: 1px solid variables.$vas-color-grayscale--400;
    }

    &__tab-item {
      display: flex;
      gap: 5px;
      align-items: center;
      padding: 3px 6px;
      border: 1px solid variables.$vas-color-grayscale--400;
      border-bottom: 0;
      cursor: pointer;

      &--active {
        opacity: 1;
        background-color: variables.$vas-color-grayscale--400;
      }

      &:hover {
        opacity: 0.9;
        background-color: variables.$vas-color-grayscale--500;
      }
    }

    &__tab-item-icon {
      display: block;
      width: 17px;
      height: 17px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 17px;

      &--menu {
        background-image: url('../assets/text.svg');
      }

      &--config {
        background-image: url('../assets/cog-wheel.svg');
      }
    }
  }
</style>
