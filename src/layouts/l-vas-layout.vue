<template>
  <section :class="b('', modifiers)">
    <teleport
      v-if="$slots.pageConfig"
      defer
      to="#teleportDestinationPageConfigFlyout"
    >
      <slot name="pageConfig"></slot>
    </teleport>
    <h1
      v-if="isHeadlineVisible"
      :class="b('headline')"
    >
      {{ routeName }}
    </h1>
    <slot></slot>
  </section>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import { VasSessionStore, useVasSessionStore } from '../stores/session';

  type Setup = {
    vasSessionStore: VasSessionStore;
  };
  // type Data = {};

  export const LAYOUT_PADDINGS: string[] = ['default', '0'];
  export type LayoutPaddingType = (typeof LAYOUT_PADDINGS)[number];

  export const LAYOUT_VARIANTS: string[] = ['default', 'plain'];
  export type LayoutVariantType = (typeof LAYOUT_VARIANTS)[number];

  export default defineComponent({
    name: 'l-vas-layout',

    // components: {},

    props: {
      /**
       * Define content padding class.
       */
      padding: {
        type: String as PropType<LayoutPaddingType>,
        default: 'default',
        validator: (value: string) => LAYOUT_PADDINGS.includes(value),
      },

      /**
       * Define content padding class.
       */
      variant: {
        type: String as PropType<LayoutVariantType>,
        default: 'default',
        validator: (value: string) => LAYOUT_VARIANTS.includes(value),
      },

      /**
       * Define if the headline should be shown.
       */
      showHeadline: {
        type: Boolean,
        default: true,
      },

      /**
       * Use when the tested component brings its own layout (gutters, max-width, headline): removes the padding, the
       * max-width, the borders and the headline. Wins over `padding`, `variant` and `showHeadline`.
       */
      bare: {
        type: Boolean,
        default: false,
      },
    },
    // emits: {},

    setup(): Setup {
      return {
        vasSessionStore: useVasSessionStore(),
      };
    },
    // data(): Data {
    //   return {};
    // },

    computed: {
      routeName(): string {
        return this.$route?.meta?.title ?? (this.$route.name as string);
      },

      isHeadlineVisible(): boolean {
        return this.showHeadline && !this.bare;
      },

      modifiers(): Modifiers {
        return {
          padding: this.padding,
          variant: this.variant,
          bare: this.bare,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      this.vasSessionStore.setHasPageConfig(!!this.$slots.pageConfig);
    },
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      this.vasSessionStore.setHasPageConfig(false);
    },
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:map';
  @use 'sass:meta';
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  /**
   * Client projects can adapt the layout to their own frame with CSS custom properties, e.g. on `:root`:
   * --vas-layout-max-width: content max-width (default: `lg` breakpoint)
   * --vas-layout-gutter: content padding (default: spacing 30)
   * --vas-layout-offset-top: space above the layout, e.g. the height of a sticky header (default: 0)
   */
  .l-vas-layout {
    &--variant-default {
      @include mixins.container;

      max-width: var(--vas-layout-max-width, #{map.get(variables.$vas-breakpoints, lg)});
      height: 100%;
      border-right: 1px solid var(--vas-theme-border-color);
      border-left: 1px solid var(--vas-theme-border-color);
    }

    &--variant-default,
    &--variant-plain {
      margin-top: var(--vas-layout-offset-top, 0);
    }

    &--padding-default {
      padding: var(--vas-layout-gutter, #{variables.$vas-spacing--30});
    }

    &--padding-0 {
      padding: 0;
    }

    &--bare {
      max-width: none;
      padding: 0;
      border: 0;
    }

    &__headline {
      margin-bottom: 2rem;
    }

    &__highlight {
      position: relative;
      z-index: 2;

      &::after {
        content: '';
        position: absolute;
        top: -4px;
        left: -2px;
        height: calc(100% + 8px);
        width: calc(100% + 4px);
        background-color: var(--vas-theme-background-surface);
        z-index: -1;
        opacity: 1;
        border-radius: variables.$vas-theme-border-radius;
      }
    }

    &__list {
      list-style-type: circle;
      padding-left: 30px;
    }
  }
</style>
