<template>
  <div :class="b('', { expanded: isExpanded })">
    <component
      :is="hasChildren ? 'button' : 'a'"
      :href="!hasChildren ? getLinkHref : undefined"
      :class="
        b('item', {
          isParent: hasChildren,
          activeParent: isActiveParent,
          active: isActiveRoute,
        })
      "
      @click.prevent="onItemClick"
    >
      {{ routeTitle }}
      <span :class="b('overlay')"></span>
      <span :class="b('icon')"></span>
    </component>

    <transition name="collapse">
      <div
        v-if="hasChildren && isExpanded"
        :class="b('children')"
      >
        <c-vas-navigation-block
          v-for="childRoute in routeDefinition.children"
          :key="childRoute.name"
          :route-definition="childRoute"
          :class="b('child')"
        />
      </div>
    </transition>
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
      routeDefinition: {
        type: Object as PropType<RouteRecordRaw>,
        required: true,
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
      routeTitle(): string {
        return this.routeDefinition?.meta?.title as string;
      },

      routeUrlName(): string {
        return this.routeDefinition?.name as string;
      },

      isExpanded(): boolean {
        return this.expandedItems.includes(this.routeUrlName);
      },

      isActiveRoute(): boolean {
        return this.route.name === this.routeUrlName;
      },

      isActiveParent(): boolean {
        return this.route.matched.some((record) => record.name === this.routeUrlName);
      },

      hasChildren(): boolean {
        return !!this.routeDefinition.children?.length;
      },

      getLinkHref(): string {
        try {
          const route = this.routeDefinition;

          return this.router.resolve({ name: route.name, params: route.meta?.params, query: route.meta?.query }).href;
        } catch {
          return '';
        }
      },
    },
    watch: {
      routeDefinition: {
        immediate: true,
        handler() {
          // Auto-expand all categories if there are few routes (likely filtered)
          if (this.hasChildren && !this.isExpanded) {
            this.expandedItems.push(this.routeUrlName);
          }
        },
      },
    },
    methods: {
      /**
       * Defines what is to do if an item is clicked.
       */
      onItemClick(): void {
        if (this.hasChildren) {
          this.onToggle();

          return;
        }

        this.onNavigate();
      },

      /**
       * Toggles the expanded state of a parent route.
       */
      onToggle(): void {
        if (!this.hasChildren) {
          return;
        }

        const name = this.routeDefinition?.name as string;
        const index = this.expandedItems.indexOf(name);

        if (index === -1) {
          this.expandedItems.push(name);
        } else {
          this.expandedItems.splice(index, 1);
        }
      },

      /**
       * Navigates to a route.
       */
      onNavigate(): void {
        if (this.hasChildren) {
          return;
        }

        const route = this.routeDefinition;

        this.router.push({ name: route.name, params: route.meta?.params, query: route.meta?.query });
      },
    },
    // created() {}
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-navigation-block {
    $this: &;

    position: relative;

    &:not(:first-child) {
      margin-top: variables.$vas-spacing--8;
    }

    &--expanded {
      #{$this}__icon {
        transform: rotate(0deg);
      }
    }

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      outline: none;
      max-width: 100%;
      width: 100%;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--30 variables.$vas-spacing--4 variables.$vas-spacing--8;
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
        position: sticky;
        top: 0;
        margin-top: 0;
        border-bottom: 1px dashed variables.$vas-color-grayscale--700;
        display: grid;
        background-color: variables.$vas-color-grayscale--1000;
        z-index: 1;

        #{$this}__logo,
        #{$this}__icon {
          display: block;
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
    }

    &__logo {
      display: none;
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
      right: -1px;
      top: variables.$vas-spacing--10;
      transform: rotate(-90deg);
    }

    &__children {
      #{$this}__item {
        padding-left: 20px;
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
