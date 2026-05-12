<template>
  <l-vas-layout>
    <div :class="b()">
      <p>This page is used to test the nested navigation structure in the sidebar.</p>
      <c-vas-navigation
        :class="b('navigation')"
        :routes="dummyRoutes"
      />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { faker } from '@faker-js/faker';
  import { defineComponent } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import cVasNavigation from '../../../components/c-vas-navigation.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {}
  // type Data = {}

  /**
   * Demo page for the navigation component.
   */
  export default defineComponent({
    name: 'r-navigation',

    components: {
      cVasNavigation,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    // data(): Data {
    //   return {};
    // },

    computed: {
      dummyRoutes(): RouteRecordRaw[] {
        const sections = ['Components', 'Elements', 'Features', 'Styles'];

        const routes: RouteRecordRaw[] = [];

        sections.forEach((section) => {
          const children: RouteRecordRaw[] = [];

          Array.from({ length: 10 }).forEach((_, index) => {
            children.push({
              path: `${section}-child-${index}`,
              name: `${section}-child-${index}`,
              component: { template: '<div>Child Content</div>' },
              meta: {
                title: faker.company.name(),
              },
            });
          });

          routes.push({
            ...this.getParentNode(section),
            children,
          });
        });

        return routes;
      },
    },
    // watch: {},

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
      getParentNode(name: string): RouteRecordRaw {
        return {
          path: name,
          name,
          component: { template: '<router-view />' },
          meta: {
            title: name,
          },
        };
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../../../setup/scss/variables';

  .r-navigation {
    &__navigation {
      padding: 10px;
      border: 1px solid variables.$vas-color-grayscale--300;
      height: 60vh;
      width: 600px;
      overflow-y: auto;
    }
  }
</style>
