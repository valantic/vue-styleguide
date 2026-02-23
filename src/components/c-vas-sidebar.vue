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
    />

    <button
      :class="b('float-button', { config: true, active: showConfig && isOpen })"
      type="button"
      @click="onToggleSidebar(false, true)"
    />

    <div :class="b('container')">
      <c-vas-styleguide-brand :class="b('header')" />

      <div :class="b('content-wrapper')">
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
          <c-vas-navigation :routes="router.options.routes" />
        </section>

        <section v-else>
          <div :class="b('section-header')">Settings</div>
          <c-vas-config />
        </section>
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
    </div>
    <c-vas-hotkey-modal v-model:is-open="isHotkeysModalOpen" />
  </div>
</template>

<script lang="ts">
  import { Ref, defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import packageJson from '../../package.json';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import cVasConfig from './c-vas-config.vue';
  import cVasHotkeyModal from './c-vas-hotkey-modal.vue';
  import cVasNavigation from './c-vas-navigation.vue';
  import cVasStyleguideBrand from './c-vas-styleguide-brand.vue';

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
    isOpen: boolean;
    showMenu: boolean;
    showConfig: boolean;
    isHotkeysModalOpen: boolean;
  };

  export default defineComponent({
    name: 'c-vas-sidebar',

    components: {
      cVasHotkeyModal,
      eVasIcon,
      cVasStyleguideBrand,
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
        isOpen: false,
        showMenu: false,
        showConfig: false,
        isHotkeysModalOpen: false,
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

      $route() {
        this.onToggleSidebar(false, false, false);
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
        const isEscKey = event.key === 'Escape';

        if (event.metaKey && event.shiftKey && event.key === 'o') {
          event.preventDefault();
          this.onToggleSidebar(true, false, !this.isOpen);
        }

        // HotKey: ESC
        if (isEscKey && this.isOpen) {
          event.preventDefault();
          this.onToggleSidebar(true, false, false);
        }

        if (event.metaKey && event.shiftKey && event.key === ':') {
          event.preventDefault();
          this.onToggleSidebar(false, true, true);
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
    $c-vas-sidebar--sidebar-width: 320px;

    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    width: 0;
    height: 100vh;

    &--open {
      #{$this}__container {
        display: flex;
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
        background-image: url('../assets/icons/i-text.svg');
      }

      &--config {
        bottom: $c-vas-sidebar--button-size - 1px;
        background-image: url('../assets/icons/i-cog-wheel.svg');
      }

      &--active {
        opacity: 1;
        background-color: variables.$vas-color-grayscale--400;
      }

      &:hover {
        background-color: variables.$vas-color-grayscale--500;
      }
    }

    &__container {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: none;
      width: 0;
      height: 100%;
      background-color: variables.$vas-color-grayscale--1000;
      flex-direction: column;
    }

    &__header {
      background-color: rgba(variables.$vas-color-green-vue, 0.1);
      height: 40px;
    }

    &__content-wrapper {
      font-family: variables.$vas-font-family--primary;
      padding: variables.$vas-spacing--12;
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
        background-image: url('../assets/icons/i-text.svg');
      }

      &--config {
        background-image: url('../assets/icons/i-cog-wheel.svg');
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
