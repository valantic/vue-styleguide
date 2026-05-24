<template>
  <div
    :class="b('', { expanded: isExpanded })"
    :style="{ '--vas-nav-depth': depth }"
  >
    <component
      :is="hasChildren ? 'button' : 'a'"
      :href="!hasChildren ? getLinkHref : undefined"
      :class="
        b('item', {
          isParent: hasChildren,
          activeParent: isActiveParent,
          active: isActiveRoute,
          selected: isSelected,
        })
      "
      @click.prevent="onItemClick"
    >
      {{ routeTitle }}
      <span :class="b('overlay')"></span>
      <span :class="b('icon')">
        <e-vas-icon
          icon="i-chevron--down"
          size="12"
        />
      </span>
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
          :selected-route-name="selectedRouteName"
          :depth="depth + 1"
          :class="b('child')"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { useRoute, useRouter } from 'vue-router';
  import eVasIcon from '../elements/e-vas-icon.vue';

  type Setup = {
    router: ReturnType<typeof useRouter>;
    route: ReturnType<typeof useRoute>;
  };

  type Data = {
    expandedItems: string[];
  };

  /**
   * Renders a navigation block with expandable children.
   */
  export default defineComponent({
    name: 'c-vas-navigation-block',
    components: {
      eVasIcon,
    },

    props: {
      /**
       * An array of styleguide routes.
       */
      routeDefinition: {
        type: Object as PropType<RouteRecordRaw>,
        required: true,
      },

      /**
       * The name of the selected route.
       */
      selectedRouteName: {
        type: String,
        default: '',
      },

      /**
       * The nesting depth of this block, used to calculate indentation.
       */
      depth: {
        type: Number,
        default: 0,
      },
    },
    // emits: {},

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

      isSelected(): boolean {
        const key = (this.routeDefinition.meta?.selectionKey as string) ?? this.routeUrlName;

        return this.selectedRouteName === key;
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
      onItemClick(): void {
        if (this.hasChildren) {
          this.onToggle();

          return;
        }

        this.onNavigate();
      },

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
    // render() {},
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
      $padding-left: calc(#{variables.$vas-spacing--12} * var(--vas-nav-depth, 0));

      position: relative;
      display: flex;
      align-items: center;
      outline: none;
      max-width: 100%;
      width: 100%;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--30 variables.$vas-spacing--4 $padding-left;
      font-size: variables.$vas-font-size--base;
      line-height: 20px;
      text-decoration: none;
      color: var(--vas-theme-text-color) !important; // stylelint-disable-line declaration-no-important
      cursor: pointer;
      border-radius: 2px;
      overflow-wrap: break-word;
      text-wrap: wrap;
      margin-top: variables.$vas-spacing--4;
      scroll-margin-bottom: 100px;
      scroll-margin-top: 100px;

      &--selected {
        outline: 2px dashed var(--vas-theme-border-color);

        #{$this}__overlay {
          opacity: 0.4;
        }
      }

      &--is-parent {
        position: sticky;
        top: 0;
        margin-top: 0;
        display: grid;
        border-bottom: 1px dashed var(--vas-theme-border-color);
        background-color: var(--vas-theme-background-content);
        z-index: 1;
        font-size: variables.$vas-font-size--small;
        font-weight: bold;
        text-transform: uppercase !important; // stylelint-disable-line declaration-no-important
        padding-left: variables.$vas-spacing--4;

        #{$this}__logo,
        #{$this}__icon {
          display: block;
        }
      }

      &--active {
        font-weight: bold;
        color: var(--vas-theme-text-color-highlight) !important; // stylelint-disable-line declaration-no-important

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
      background-color: var(--vas-theme-highlight);
    }

    &__icon {
      display: none;
      width: 12px;
      height: 12px;
      margin-right: variables.$vas-spacing--8;
      transition: transform 0.2s ease;
      position: absolute;
      right: -1px;
      top: variables.$vas-spacing--10;
      transform: rotate(-90deg);
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
