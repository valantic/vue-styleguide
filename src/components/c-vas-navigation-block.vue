<template>
  <ul :class="b(componentModifiers)">
    <li
      v-for="route in filteredRoutes"
      :key="route.name"
      :class="b('navigation-item')"
    >
      <router-link
        :to="route.children?.length ? {} : { name: route.name, params: route.meta?.params, query: route.meta?.query }"
        :class="b('navigation-link', { isParent: !!route.children?.length })"
        :active-class="b('navigation-link', { activePath: true })"
        :exact-active-class="b('navigation-link', { active: true })"
        exact
      >
        {{ route.meta?.title }}
      </router-link>
      <c-vas-navigation-block
        v-if="route.children?.length"
        :routes="route.children"
        is-child-node
      />
    </li>
  </ul>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'c-vas-navigation-block',

    // components: {},

    props: {
      /**
       * An array of styleguide routes.
       */
      routes: {
        type: Array as PropType<readonly RouteRecordRaw[]>,
        default: () => [],
      },

      /**
       * Defines if the component should have an extra indentation.
       */
      isChildNode: {
        type: Boolean,
        default: false,
      },
    },
    // setup(): Setup {
    //   return {
    //   };
    // },
    // data(): Data {
    //   return {};
    // },
    computed: {
      /**
       * Returns all modifiers for the component main class.
       */
      componentModifiers(): Modifiers {
        return {
          isChildNode: this.isChildNode,
        };
      },

      /**
       * Returns an array of routes, that should be visible on the navigation.
       */
      filteredRoutes(): RouteRecordRaw[] {
        const filteredRoutes = this.routes.filter((route) => route.meta && !route.meta.hideInStyleguide);

        // Do not sort menu items on top level.
        if (!this.isChildNode) {
          return filteredRoutes;
        }

        // eslint-disable-next-line unicorn/no-array-sort
        return filteredRoutes.sort((first, second) => {
          if (!first.meta || !second.meta) {
            return 0;
          }

          if (first.meta.title < second.meta.title) {
            return -1;
          }

          return second.meta.title < first.meta.title ? 1 : 0;
        });
      },
    },
    // methods: {},
    // created() {}
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-navigation-block {
    overflow: auto;

    &--is-child-node {
      padding-left: 16px;
      margin: 0;
    }

    &__navigation-link {
      display: block;
      padding: 5px;
      text-decoration: none;

      &:hover:not(&--is-parent) {
        background-color: variables.$vas-color-grayscale--500;
      }

      &--active,
      &--active-path {
        font-weight: bold;
      }

      &--active {
        background-color: variables.$vas-color-grayscale--600;
      }

      &--is-parent {
        background-color: initial;
      }
    }
  }
</style>
