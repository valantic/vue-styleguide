<template>
  <div ref="container" :class="b('', modifiers)">
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
          @click="onToggleSidebar(true)">
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
        <c-vas-sidebar-navigation  />
      </section>

      <section v-else>
        <div :class="b('section-header')">Settings</div>
        <c-vas-sidebar-config
          :theme-path="themePath"
          :available-themes="availableThemes"
          @update-theme="onUpdateTheme"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, Ref, ref } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import { Theme } from './c-vas-theme-selector.vue';
  import cVasSidebarConfig from './c-vas-sidebar-config.vue';
  import cVasSidebarNavigation from './c-vas-sidebar-navigation.vue';

  type KeyEvent = Event & {
    ctrlKey: boolean;
    key: string;
  };

  type Setup = {
    container: Ref<HTMLDivElement | null | undefined>;
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
       * Path to the theme scss files.
       */
      themePath: {
        type: String,
        default: 'src/setup/scss/themes',
      },

      /**
       * Array of available themes.
       */
      availableThemes: {
        type: Array as PropType<Theme[]>,
        default: () => [],
      },
    },

    emits: {
      'updateTheme': (theme: string) => typeof theme === 'string',
    },
    setup(): Setup {
      return {
        container: ref(),
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
      onToggleSidebar(showMenu: boolean = false, showConfig: boolean = false, isOpen: boolean = true) {
        this.isOpen = isOpen;
        this.showMenu = showMenu;
        this.showConfig = showConfig;
      },

      onUpdateTheme(theme: string) {
        this.$emit('updateTheme', theme);
      },

      /**
       * Hides the overlay if the user clicks somewhere else than inside the container.
       */
      handleOutsideClick(event: Event) {
        if (!this.container?.contains(event.target as Node)) {
          this.onToggleSidebar(false, false, false);
        }
      },

      handleHotKeys(event: KeyEvent) {
        // Check if both Control and O keys are pressed
        if (event.ctrlKey && event.key === 'o') {
          event.preventDefault();
          this.onToggleSidebar(true, false, !this.isOpen);
        }
      }
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

    z-index: 999;
    position: fixed;
    height: 100vh;
    width: 0;
    right: 0;
    top: 0;

    &--open {
      #{$this}__wrapper {
        border-left: 10px solid variables.$color-grayscale--400;
        display: block;
        width: $c-vas-sidebar--sidebar-width;
      }

      #{$this}__viewport,
      #{$this}__float-button {
        opacity: 1;
        right: $c-vas-sidebar--sidebar-width - 10px;
      }
    }

    &__float-button {
      opacity: 0.2;
      position: absolute;
      width: $c-vas-sidebar--button-size;
      height: $c-vas-sidebar--button-size;
      border: 1px solid variables.$color-grayscale--400;
      cursor: pointer;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: variables.$color-grayscale--1000;
      background-repeat: no-repeat;
      background-position: center;
      background-size: $c-vas-sidebar--button-size - 15px;

      &--menu {
        background-image: url('../assets/text.svg');
        bottom: 0;
      }

      &--config {
        background-image: url('../assets/cog-wheel.svg');
        bottom: $c-vas-sidebar--button-size - 1px;
      }

      &--active {
        background-color: variables.$color-grayscale--400;
        opacity: 1;
      }

      &:hover {
        background-color: variables.$color-grayscale--500;
        opacity: 0.9;
      }
    }

    &__wrapper {
      display: none;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 100%;
      background-color: variables.$color-grayscale--1000;
      font-family: variables.$font-family--primary;
      z-index: 1;
      padding: 12px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
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
      width: 100%;
      text-align: center;
      bottom: 0;
      left: 0;
      font-size: 10px;
      color: variables.$color-grayscale--0;
    }

    &__viewport {
      display: flex;
      align-items: center;
      gap: 5px;
      position: absolute;
      z-index: 2;
      opacity: 0.2;
      right: 0;
      color: variables.$color-grayscale--0;
      background: variables.$color-grayscale--400;
      padding: 2px 10px;
    }

    &__section-header {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__tabs {
      display: flex;
      border-bottom: 1px solid variables.$color-grayscale--400;
      margin-bottom: 10px;
    }

    &__tab-item {
      display: flex;
      align-items: center;
      padding: 3px 6px;
      border: 1px solid variables.$color-grayscale--400;
      border-bottom: 0;
      cursor: pointer;
      gap: 5px;

      &--active {
        background-color: variables.$color-grayscale--400;
        opacity: 1;
      }

      &:hover {
        background-color: variables.$color-grayscale--500;
        opacity: 0.9;
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
