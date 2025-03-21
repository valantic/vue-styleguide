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
  import { defineComponent } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import cVasNavigationBlock from './c-vas-navigation-block.vue';
  import cVasNavigationFilter from './c-vas-navigation-filter.vue'; // type Setup = {};

  // type Setup = {};

  type Data = {
    navigationFilter: string;
  };

  export default defineComponent({
    name: 'c-vas-sidebar-navigation',

    components: {
      cVasNavigationBlock,
      cVasNavigationFilter,
    },
    // props: {},

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
        return this.filterRoutesByTitle(this.$router.options.routes, this.navigationFilter);
      },
    },
    methods: {
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
    },
  });
</script>

<style lang="scss">
  .c-vas-sidebar-navigation {
    $this: &;

    &__filter {
      margin-bottom: 20px;
    }
  }
</style>
