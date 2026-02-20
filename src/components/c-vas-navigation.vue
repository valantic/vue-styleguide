<template>
  <div :class="b()">
    <c-vas-navigation-filter
      v-model="navigationFilter"
      :class="b('filter')"
    />

    <c-vas-navigation-block
      :routes="routesFilteredByTitle"
      :class="b('menu')"
    />
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
      routesFilteredByTitle(): RouteRecordRaw[] {
        return this.filterRoutesByTitle(this.routes, this.navigationFilter);
      },
    },
    methods: {
      /**
       * Filters the routes by their title.
       */
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
    },
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-navigation {
    display: flex;
    flex-direction: column;

    &__filter {
      margin-bottom: variables.$vas-spacing--8;
    }

    &__menu {
      display: flex;
      flex-direction: column;
      flex: 0 1 auto;
      height: 100%;
      max-width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
