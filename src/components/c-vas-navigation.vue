<template>
  <div
    :class="b()"
    @keydown.down.prevent="onKeyDownDown"
    @keydown.up.prevent="onKeyDownUp"
    @keydown.enter.prevent="onKeyDownEnter"
  >
    <c-vas-navigation-filter
      v-model="navigationFilter"
      :class="b('filter')"
    />

    <div :class="b('menu')">
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
  import cVasNavigationBlock from './c-vas-navigation-block.vue';
  import cVasNavigationFilter from './c-vas-navigation-filter.vue';

  // type Setup = {};
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
      cVasNavigationBlock,
      cVasNavigationFilter,
    },

    props: {
      /**
       * An array of styleguide routes.
       */
      routes: {
        type: Array as PropType<readonly RouteRecordRaw[]>,
        default: () => [],
      },
    },
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        navigationFilter: '',
        activeIndex: -1,
      };
    },

    computed: {
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
        const routes = this.filteredRoutes;
        const structuredRoutes = routes.filter((route) => route.children && route.children.length > 0);
        const globalRoutes = routes.filter((route) => !route.children || route.children.length === 0);

        if (globalRoutes.length === 0) {
          return structuredRoutes;
        }

        const globalRoutesGroup: RouteRecordRaw = {
          path: '/global-routes',
          name: 'global-routes',
          meta: {
            title: 'Global Routes',
          },
          children: globalRoutes,
        };

        return [...structuredRoutes, globalRoutesGroup];
      },

      selectedRouteName(): string {
        return (this.flattenedRoutes[this.activeIndex]?.name as string) ?? '';
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
          this.$nextTick(() => {
            const element = document.querySelector('.c-vas-navigation-block__item--selected');

            element?.scrollIntoView({ block: 'nearest' });
          });
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
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      onKeyDownDown(): void {
        // Avoid under any circumstances that the active index of the list is -1, which could happen if you e.g.,
        // search an element and the list is updated somehow - if this happens - the first entry is selected again.
        let nextIndex = this.activeIndex === -1 ? 0 : this.activeIndex + 1;

        while (nextIndex < this.flattenedRoutes.length) {
          const route = this.flattenedRoutes[nextIndex];

          if (!route?.children || route.children.length === 0) {
            this.activeIndex = nextIndex;

            return;
          }
          nextIndex++;
        }
      },

      onKeyDownUp(): void {
        let prevIndex = this.activeIndex - 1;

        while (prevIndex >= 0) {
          const route = this.flattenedRoutes[prevIndex];

          if (!route?.children || route.children.length === 0) {
            this.activeIndex = prevIndex;

            return;
          }
          prevIndex--;
        }
      },

      onKeyDownEnter(): void {
        if (this.activeIndex >= 0 && this.activeIndex < this.flattenedRoutes.length) {
          const route = this.flattenedRoutes[this.activeIndex];

          if (!route?.name || (route?.children && route.children.length > 0)) {
            return;
          }

          this.$router.push({
            name: route.name as string,
            params: route.meta?.params as Record<string, string>,
            query: route.meta?.query as Record<string, string | (string | null)[] | null>,
          });
        }
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

    &__filter {
      margin-bottom: variables.$vas-spacing--8;
    }

    &__menu {
      display: flex;
      flex-direction: column;
    }
  }
</style>
