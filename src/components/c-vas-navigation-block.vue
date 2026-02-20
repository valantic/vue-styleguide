<template>
  <div :class="b()">
    <div
      v-for="routeItem in filteredRoutes"
      :key="routeItem.name"
      :class="b('group', { expanded: isExpanded(routeItem) })"
    >
      <component
        :is="hasChildren(routeItem) ? 'button' : 'a'"
        :href="!hasChildren(routeItem) ? getLinkHref(routeItem) : undefined"
        :class="
          b('item', {
            isParent: hasChildren(routeItem),
            activeParent: isActiveParent(routeItem),
            active: isActiveRoute(routeItem),
          })
        "
        @click.prevent="onItemClick(routeItem)"
      >
        {{ routeItem.meta?.title }}
        <span :class="b('overlay')"></span>
        <span :class="b('icon')"></span>
      </component>

      <transition name="collapse">
        <c-vas-navigation-block
          v-if="hasChildren(routeItem) && isExpanded(routeItem)"
          :routes="routeItem.children"
          :class="b('children')"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';

  type Setup = {
    router: ReturnType<typeof useRouter>;
    route: ReturnType<typeof useRoute>;
  };

  // type Setup = {};
  type Data = {
    expandedItems: string[];
  };

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
    },
    setup(): Setup {
      return {
        router: useRouter(),
        route: useRoute(),
      };
    },
    data(): Data {
      return {
        expandedItems: [],
      };
    },
    computed: {
      /**
       * Returns an array of routes that should be visible on the navigation.
       */
      filteredRoutes(): RouteRecordRaw[] {
        const filteredRoutes = this.routes.filter((route) => route.meta && !route.meta.hideInStyleguide);

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
    watch: {
      routes: {
        immediate: true,
        handler(newRoutes: RouteRecordRaw[]) {
          // Auto-expand all categories if there are few routes (likely filtered)
          if (newRoutes.length > 0 && newRoutes.length < 20) {
            newRoutes.forEach((route) => {
              if (route.children?.length && !this.isExpanded(route)) {
                this.expandedItems.push(route.name as string);
              }
            });
          }
        },
      },
    },
    methods: {
      /**
       * Defines what is to do if an item is clicked.
       */
      onItemClick(route: RouteRecordRaw): void {
        if (this.hasChildren(route)) {
          this.onToggle(route);

          return;
        }

        this.onNavigate(route);
      },

      /**
       * Toggles the expanded state of a parent route.
       */
      onToggle(route: RouteRecordRaw): void {
        if (!this.hasChildren(route)) {
          return;
        }

        const name = route?.name as string;
        const index = this.expandedItems.indexOf(name);

        if (index === -1) {
          this.expandedItems.push(name);
        } else {
          this.expandedItems.splice(index, 1);
        }
      },

      /**
       * Checks if a route is expanded.
       */
      isExpanded(route: RouteRecordRaw): boolean {
        const name = route?.name as string;

        return this.expandedItems.includes(name);
      },

      /**
       * Navigates to a route.
       */
      onNavigate(route: RouteRecordRaw): void {
        if (this.hasChildren(route)) {
          return;
        }

        this.router.push({ name: route.name, params: route.meta?.params, query: route.meta?.query });
      },

      /**
       * Checks if the route is exactly active.
       */
      isActiveRoute(route: RouteRecordRaw): boolean {
        const name = route?.name as string;

        return this.route.name === name;
      },

      /**
       * Checks if the route is active (active path).
       */
      isActiveParent(route: RouteRecordRaw): boolean {
        const name = route?.name as string;

        return this.route.matched.some((record) => record.name === name);
      },

      hasChildren(route: RouteRecordRaw): boolean {
        return !!route.children?.length;
      },

      getLinkHref(route: RouteRecordRaw): string {
        try {
          return this.router.resolve({ name: route.name, params: route.meta?.params, query: route.meta?.query }).href;
        } catch {
          return '';
        }
      },
    },
    // created() {}
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-navigation-block {
    $this: &;

    &__group {
      &:not(:first-child) {
        margin-top: variables.$vas-spacing--8;
      }

      &--expanded {
        #{$this}__icon {
          transform: rotate(0deg);
        }
      }
    }

    &__item {
      display: flex;
      align-items: center;
      outline: none;
      max-width: 100%;
      width: 100%;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--30 variables.$vas-spacing--4 variables.$vas-spacing--8;
      position: relative;
      text-decoration: none;
      color: variables.$vas-font-color--text !important; // stylelint-disable-line declaration-no-important
      cursor: pointer;
      min-height: 32px;
      border-radius: 2px;
      word-break: break-word;
      text-wrap: wrap;
      margin-top: variables.$vas-spacing--4;

      &--active,
      &--active-parent {
        font-weight: bold;
      }

      &--is-parent {
        margin-top: 0;
        border-bottom: 1px dashed variables.$vas-color-grayscale--700;

        #{$this}__icon {
          display: block;
        }

        &::before {
          display: none;
        }
      }

      &--active {
        #{$this}__overlay {
          opacity: 1;
        }
      }

      &:hover:not(&--active) {
        #{$this}__overlay {
          opacity: 0.6;
        }
      }

      &::before {
        content: '';
        height: 1px;
        width: 4px;
        position: absolute;
        left: 8px;
        top: calc(50% - 0.5px);
        background-color: rgba(variables.$vas-color-grayscale--0, 1);
      }
    }

    &__overlay {
      border-radius: inherit;
      inset: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transition: 0.2s ease-in-out;
      transition-property: opacity, color;
      background-color: rgba(variables.$vas-color-grayscale--0, 0.08);
    }

    &__icon {
      display: none;
      width: 12px;
      height: 12px;
      margin-right: variables.$vas-spacing--8;
      background-image: url('../assets/chevron--down.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transition: transform 0.2s ease;
      position: absolute;
      right: variables.$vas-spacing--4;
      top: variables.$vas-spacing--10;
      transform: rotate(-90deg);
    }

    &__children {
      #{$this}__item {
        padding-left: variables.$vas-spacing--18;
      }
    }

    // Transition
    .collapse-enter-active,
    .collapse-leave-active {
      transition:
        max-height 0.3s ease,
        opacity 0.3s ease;
      max-height: 1000px;
      overflow: hidden;
    }

    .collapse-enter-from,
    .collapse-leave-to {
      max-height: 0;
      opacity: 0;
    }
  }
</style>
