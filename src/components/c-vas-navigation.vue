<template>
  <div
    :class="b()"
    @keydown.down.prevent="onKeyDownDown"
    @keydown.up.prevent="onKeyDownUp"
    @keydown.enter.prevent="onKeyDownEnter"
  >
    <div :class="b('search-container')">
      <e-vas-input
        v-model.trim="navigationFilter"
        :class="b('search-input')"
        name="filter"
        placeholder="Search Menu ..."
        autofocus
        select-on-focus
        @click.stop
      />
      <button
        v-if="navigationFilter"
        :class="b('search-clear-button')"
        type="button"
        @click.stop="navigationFilter = ''"
      >
        <e-vas-icon
          icon="i-close"
          size="8"
        />
      </button>
    </div>

    <div :class="b('menu')">
      <c-vas-navigation-block
        v-if="!navigationFilter && lastOpenedRoutes.length"
        :route-definition="lastOpenedGroup"
        :selected-route-name="selectedRouteName"
      />
      <c-vas-navigation-block
        v-for="routeItem in groupedRoutes"
        :key="`${routeItem.name as string}-${navigationFilter}`"
        :route-definition="routeItem"
        :selected-route-name="selectedRouteName"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import eVasInput from '../elements/e-vas-input.vue';
  import type { VasSessionStore } from '../stores/session';
  import { useVasSessionStore } from '../stores/session';
  import { validateRoutes } from '../utils/route-validator';
  import cVasNavigationBlock from './c-vas-navigation-block.vue';

  type Setup = {
    vasSessionStore: VasSessionStore;
  };

  type Data = {
    navigationFilter: string;
    activeIndex: number;
  };

  /**
   * Renders the styleguide navigation with filtering and sorting.
   */
  export default defineComponent({
    name: 'c-vas-navigation',

    components: {
      eVasIcon,
      eVasInput,
      cVasNavigationBlock,
    },

    props: {
      /**
       * An array of styleguide routes.
       */
      routes: {
        type: Array as PropType<readonly RouteRecordRaw[]>,
        default: () => [],
      },

      /**
       * Route name to highlight as selected, e.g. when hovering a last-opened button.
       */
      hoveredRouteName: {
        type: String,
        default: '',
      },
    },
    // emits: {},

    setup(): Setup {
      return {
        vasSessionStore: useVasSessionStore(),
      };
    },
    data(): Data {
      return {
        navigationFilter: '',
        activeIndex: -1,
      };
    },

    computed: {
      lastOpenedRoutes(): RouteRecordRaw[] {
        return this.vasSessionStore.state.lastOpenedRoutes;
      },

      lastOpenedGroup(): RouteRecordRaw {
        return {
          path: 'last-opened',
          name: 'last-opened',
          meta: { title: 'Last Opened' },
          children: this.lastOpenedRoutes,
        };
      },

      favoriteRoutes(): RouteRecordRaw[] {
        return this.getFavorites(this.filteredRoutes);
      },

      filteredRoutes(): RouteRecordRaw[] {
        let routes = this.getVisibleRoutes(this.routes);

        routes = this.getSortedRoutesByTitle(routes);
        routes = this.filterRoutesByTitle(routes, this.navigationFilter);

        return routes;
      },

      /**
       * Groups routes that have no children under a "Global Routes" parent.
       */
      groupedRoutes(): RouteRecordRaw[] {
        const grouped: RouteRecordRaw[] = [];

        if (!this.navigationFilter && this.favoriteRoutes.length) {
          grouped.push({
            path: 'favorites',
            name: 'favorites',
            meta: { title: 'Favorites' },
            children: this.favoriteRoutes,
          });
        }

        const structuredRoutes = this.filteredRoutes.filter((route) => route.children?.length);
        const globalRoutes = this.filteredRoutes.filter((route) => !route.children?.length);

        grouped.push(...structuredRoutes);

        if (globalRoutes.length) {
          grouped.push({
            path: '/global-routes',
            name: 'global-routes',
            meta: { title: 'Global Routes' },
            children: globalRoutes,
          });
        }

        return grouped;
      },

      selectedRouteName(): string {
        const activeRoute = this.flattenedRoutes[this.activeIndex];
        const activeKey = (activeRoute?.meta?.selectionKey as string) || (activeRoute?.name as string) || '';

        return this.hoveredRouteName || activeKey;
      },

      flattenedRoutes(): RouteRecordRaw[] {
        const flatten = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
          const result: RouteRecordRaw[] = [];

          for (const route of routes) {
            result.push(route);

            if (route?.children?.length) {
              result.push(...flatten(route.children as RouteRecordRaw[]));
            }
          }

          return result;
        };

        return flatten(this.groupedRoutes);
      },
    },
    watch: {
      navigationFilter() {
        if (this.navigationFilter) {
          this.activeIndex = this.flattenedRoutes.findIndex((route) => !route.children || route.children.length === 0);
        } else {
          this.activeIndex = -1;
        }
      },
      activeIndex() {
        if (this.activeIndex >= 0) {
          this.scrollSelectedIntoView();
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      validateRoutes(this.routes);
      this.scrollSelectedIntoView();
    },

    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Scrolls the selected navigation item into view.
       */
      scrollSelectedIntoView(): void {
        this.$nextTick(() => {
          const element =
            document.querySelector('.c-vas-navigation-block__item--selected') ||
            document.querySelector('.c-vas-navigation-block__item--active');

          element?.scrollIntoView({ block: 'nearest' });
        });
      },

      onKeyDownDown(): void {
        // Avoid it under any circumstances that the active index of the list is -1, which could happen if you e.g.,
        // search an element and the list is updated somehow - if this happens - the first entry is selected again.
        const startIndex = this.activeIndex === -1 ? 0 : this.activeIndex + 1;

        for (let i = startIndex; i < this.flattenedRoutes.length; i++) {
          const route = this.flattenedRoutes[i];

          if (!route?.children?.length) {
            this.activeIndex = i;

            return;
          }
        }
      },

      onKeyDownUp(): void {
        for (let i = this.activeIndex - 1; i >= 0; i--) {
          const route = this.flattenedRoutes[i];

          if (!route?.children?.length) {
            this.activeIndex = i;

            return;
          }
        }
      },

      onKeyDownEnter(): void {
        if (this.activeIndex >= 0 && this.activeIndex < this.flattenedRoutes.length) {
          const route = this.flattenedRoutes[this.activeIndex];

          if (!route?.name || route?.children?.length) {
            return;
          }

          this.$router.push({
            name: route.name as string,
            params: route.meta?.params as Record<string, string>,
            query: route.meta?.query as Record<string, string | (string | null)[] | null>,
          });
        }
      },

      getFavorites(routeList: readonly RouteRecordRaw[]): RouteRecordRaw[] {
        const favorites: RouteRecordRaw[] = [];

        for (const route of routeList) {
          if (route.meta?.favorite) {
            favorites.push({
              ...route,
              meta: { ...route.meta, selectionKey: `__fav__${route.name as string}` },
              children: [],
            });
          }

          if (route.children?.length) {
            favorites.push(...this.getFavorites(route.children));
          }
        }

        return favorites;
      },

      filterRoutesByTitle(routes: readonly RouteRecordRaw[], searchTerm: string): RouteRecordRaw[] {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

        if (!lowerCaseSearchTerm) {
          return [...routes];
        }

        const searchTokens = lowerCaseSearchTerm.split(/\s+/);

        return routes.reduce((filteredRoutes: RouteRecordRaw[], route) => {
          const title = route.meta?.title?.toLowerCase() || '';
          const alternativeTitles = route.meta?.alternativeTitles?.toString().toLowerCase() || '';
          const combinedTitles = `${title} ${alternativeTitles}`;

          const isMatch = searchTokens.every((token) => combinedTitles.includes(token));

          if (isMatch) {
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

      getVisibleRoutes(routes: readonly RouteRecordRaw[]): RouteRecordRaw[] {
        return routes.filter((route) => route.meta && !route.meta.hideInStyleguide);
      },

      getSortedRoutesByTitle(routes: RouteRecordRaw[]): RouteRecordRaw[] {
        // create a shallow copy to avoid mutating the original array and sort it
        // eslint-disable-next-line unicorn/no-array-sort
        const sorted = [...routes].sort((first, second) => {
          if (!first.meta || !second.meta) {
            return 0;
          }

          // Check for custom sorting using sortOrder.
          const firstSortOrder = first.meta.sortOrder as number | undefined;
          const secondSortOrder = second.meta.sortOrder as number | undefined;

          if (firstSortOrder !== undefined && secondSortOrder !== undefined) {
            return firstSortOrder - secondSortOrder;
          }

          if (firstSortOrder !== undefined) {
            return -1;
          }

          if (secondSortOrder !== undefined) {
            return 1;
          }

          if (first.meta.title < second.meta.title) {
            return -1;
          }

          return second.meta.title < first.meta.title ? 1 : 0;
        });

        // recursively sort children (if any) to ensure consistent ordering at all levels
        return sorted.map((route) => {
          if (route.children && route.children.length > 0) {
            return {
              ...route,
              children: this.getSortedRoutesByTitle(route.children as RouteRecordRaw[]),
            } as RouteRecordRaw;
          }

          return route;
        });
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-navigation {
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;

    &__search-container {
      margin-bottom: variables.$vas-spacing--8;
      position: sticky;
      top: 0;
      z-index: 5;
      padding-bottom: variables.$vas-spacing--8;
      border-bottom: 1px solid var(--vas-theme-background-container);

      &::after {
        content: '';
        position: absolute;
        background-color: var(--vas-theme-background-content);
        top: -12px;
        left: -12px;
        width: calc(100% + 24px);
        height: calc(100% + 12px);
        z-index: -1;
      }
    }

    &__search-input {
      position: relative;
      width: 100%;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--30 variables.$vas-spacing--8 variables.$vas-spacing--8;
      font-size: variables.$vas-font-size--base;
    }

    &__search-clear-button {
      position: absolute;
      top: 6px;
      right: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      cursor: pointer;
      background-color: var(--vas-theme-highlight);
      padding: variables.$vas-spacing--2;
      z-index: 99;

      &:hover {
        background-color: var(--vas-theme-button-bg-hover);
      }
    }

    &__menu {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--8;
    }
  }
</style>
