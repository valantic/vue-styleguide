<template>
  <div :class="b()">
    <c-vas-navigation-filter
      v-model="navigationFilter"
      :class="b('filter')"
    />

    <div :class="b('menu')">
      <c-vas-navigation-block
        v-for="routeItem in filteredRoutes"
        :key="`${routeItem.name as string}-${navigationFilter}`"
        :route-definition="routeItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import cVasNavigationBlock from './c-vas-navigation-block.vue';
  import cVasNavigationFilter from './c-vas-navigation-filter.vue';

  // type Setup = {};
  type Data = {
    navigationFilter: string;
  };

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
    // setup(): Setup {
    //   return {
    //   };
    // },
    data(): Data {
      return {
        navigationFilter: '',
      };
    },
    computed: {
      filteredRoutes(): RouteRecordRaw[] {
        let routes = this.getVisibleRoutes(this.routes);

        routes = this.getSortedRoutesByTitle(routes);
        routes = this.filterRoutesByTitle(routes, this.navigationFilter);

        return routes;
      },
    },
    methods: {
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
