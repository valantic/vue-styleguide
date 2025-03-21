<template>
  <div ref="container" :class="b('', modifiers)">
    <div :class="b('viewport', { open: isOpen })">
      {{ $viewport.currentViewport }}
    </div>

    <button
      :class="b('float-button', { menu: true, active: showMenu })"
      type="button"
      @click="onToggleSidebar(true)"
    >
      <span></span>
    </button>
    <button
      :class="b('float-button', { config: true, active: showConfig })"
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
  import { Theme } from '../compositions/themes';
  import cVasSidebarConfig from './c-vas-sidebar-config.vue';
  import cVasSidebarNavigation from './c-vas-sidebar-navigation.vue'; // type Setup = {};

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
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('click', this.handleOutsideClick);
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
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-sidebar {
    $this: &;
    $button-size: 40px;
    $sidebar-width: 320px;

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
        width: $sidebar-width;
      }

      #{$this}__viewport,
      #{$this}__float-button {
        opacity: 1;
        right: $sidebar-width - 10px;
      }
    }

    &__float-button {
      opacity: 0.2;
      position: absolute;
      width: $button-size;
      height: $button-size;
      border: 1px solid variables.$color-grayscale--400;
      cursor: pointer;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: variables.$color-grayscale--1000;
      background-repeat: no-repeat;
      background-position: center;
      background-size: $button-size - 15px;

      &--menu {
        background-image: url('../assets/text.svg');
        bottom: 0;
      }

      &--config {
        background-image: url('../assets/cog-wheel.svg');
        bottom: $button-size - 1px;
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
  }
</style>
