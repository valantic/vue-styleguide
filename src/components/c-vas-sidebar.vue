<template>
  <div :class="b('', modifiers)">
    <button
      :class="b('float-button', { menu: true, active: showMenu })"
      type="button"
      @click="onToggleMenu"
    >
      <span></span>
    </button>
    <button
      :class="b('float-button', { config: true, active: showConfig })"
      type="button"
      @click="onToggleConfig"
    >
      <span></span>
    </button>

    <div :class="b('wrapper')">
      <div :class="b('viewport')">
        {{ $viewport.currentViewport }}
      </div>
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

      <template v-if="showMenu">
        <ul :class="b('navigation')">
          <li :class="b('navigation-item')">
            <c-vas-navigation-filter
              v-model="navigationFilter"
              :is-open="isOpen"
            />
            <c-vas-navigation-block :routes="routesFilteredByTitle" />
          </li>
        </ul>
      </template>
      <template v-else>
        <ul :class="b('navigation')">
          <li
            :class="b('navigation-item', { language: true })"
            @click.stop
          >
            <c-vas-language />
          </li>
          <li
            v-if="availableThemes.length"
            :class="b('navigation-item', { theme: true })"
            @click.stop
          >
            <c-vas-theme-selector
              :theme-path="themePath"
              :available-themes="availableThemes"
              @change="onUpdateTheme" />
          </li>
          <li :class="b('navigation-item', { settings: true })">
            <h2>Settings</h2>
            <c-vas-demo-settings />
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import cVasDemoSettings from './c-vas-demo-settings.vue';
  import cVasLanguage from './c-vas-language.vue';
  import cVasNavigationBlock from './c-vas-navigation-block.vue';
  import cVasNavigationFilter from './c-vas-navigation-filter.vue';
  import cVasThemeSelector, { Theme } from './c-vas-theme-selector.vue';

  // type Setup = {};

  type Data = {
    isOpen: boolean;
    showMenu: boolean;
    showConfig: boolean;
    navigationFilter: string;
  };

  export default defineComponent({
    name: 'c-vas-sidebar',

    components: {
      cVasDemoSettings,
      cVasLanguage,
      cVasThemeSelector,
      cVasNavigationBlock,
      cVasNavigationFilter,
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
    // setup(): Setup {
    //   return {
    //   };
    // },
    data(): Data {
      return {
        isOpen: true,
        showMenu: false,
        showConfig: false,
        navigationFilter: '',
      };
    },
    computed: {
      modifiers(): Modifiers {
        return {
          open: this.isOpen,
        };
      },
      routesFilteredByTitle(): RouteRecordRaw[] {
        return this.filterRoutesByTitle(this.$router.options.routes, this.navigationFilter);
      },
    },
    methods: {
      onToggleSidebar(showMenu: boolean = false, showConfig: boolean = false, toggle: boolean = true) {
        this.showMenu = showMenu;
        this.showConfig = showConfig;

        if (toggle) {
          this.isOpen = !this.isOpen;
        }
      },

      /**
       * Click handler for the open button.
       */
      onToggleMenu() {
        if (!this.isOpen) {
          this.onToggleSidebar(true, false);
        } else if (this.isOpen && this.showConfig) {
          this.onToggleSidebar(true, false, false);
        } else {
          this.onToggleSidebar();
        }
      },

      /**
       * Click handler for the open button.
       */
      onToggleConfig() {
        if (!this.isOpen) {
          this.onToggleSidebar(false, true);
        } else if (this.isOpen && this.showMenu) {
          this.onToggleSidebar(false, true, false);
        } else {
          this.onToggleSidebar();
        }
      },

      /**
       * Filters the routes by their title.
       *
       * @param routes - Array of type RouteRecordRaw to be filtered
       * @param searchTerm - String (route.meta.title) to filter the routes by
       * @returns - Array of type RouteRecordRaw filtered by the searchTerm
       */
      filterRoutesByTitle(routes: readonly RouteRecordRaw[], searchTerm: string): RouteRecordRaw[] {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return routes.reduce((filteredRoutes: RouteRecordRaw[], route) => {
          const titleMatch = route.meta?.title?.toLowerCase().includes(lowerCaseSearchTerm);

          if (titleMatch) {
            // the route matches the search term
            filteredRoutes.push(route);
          } else if (route.children) {
            // the parent route does not match the search term, but its children might
            const matchingChildren = this.filterRoutesByTitle(route.children, searchTerm);

            if (matchingChildren.length > 0) {
              // a child route matches, add the parent route with the matching child routes
              filteredRoutes.push({
                ...route,
                children: matchingChildren,
              });
            }
          }

          return filteredRoutes;
        }, []);
      },

      onUpdateTheme(theme: string) {
        this.$emit('updateTheme', theme);
      }
    },
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-sidebar {
    $this: &;
    $trigger-size: 40px;

    z-index: 1;
    position: fixed;
    height: 100vh;
    width: 0;
    right: 0;
    top: 0;

    &--open {
      #{$this}__wrapper {
        border-left: 10px solid variables.$color-grayscale--400;
        display: block;
        width: 320px;
      }

      #{$this}__float-button {
        opacity: 1;
        right: 310px;
      }

      #{$this}__viewport {
        padding-right: variables.$spacing--20;
      }
    }

    &__float-button {
      opacity: 0.2;
      position: absolute;
      background-color: variables.$color-grayscale--1000;
      width: $trigger-size;
      height: $trigger-size;
      border: 1px solid variables.$color-grayscale--400;
      cursor: pointer;
      right: 0;
      bottom: 0;
      z-index: 2;

      &--menu {
        background-image: url('../assets/text.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: $trigger-size - 15px;
        bottom: 0;
      }

      &--config {
        background-image: url('../assets/cog-wheel.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: $trigger-size - 15px;
        bottom: $trigger-size - 1px;
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
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
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
      position: absolute;
      left: 0;
      display: block;
      padding-right: variables.$spacing--10;
      transform: translateX(-100%);
      color: variables.$color-grayscale--1000;
      text-shadow: 1px 1px 5px variables.$color-grayscale--0;
    }

    &__navigation {
      min-width: 200px;
      max-height: 100vh;
      overflow: auto;
    }

    &__navigation-item {
      &--components {
        border-top: 1px solid variables.$color-grayscale--400;
      }

      &--language,
      &--theme,
      &--settings {
        padding: variables.$spacing--10 variables.$spacing--20;
        border-bottom: 1px solid variables.$color-grayscale--400;
      }

      &--active,
      &--active-path {
        font-weight: 700;
      }
    }

    &__navigation-link {
      display: block;
      padding: variables.$spacing--10 variables.$spacing--20;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
