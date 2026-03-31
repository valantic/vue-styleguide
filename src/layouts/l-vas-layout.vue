<template>
  <section
    class="vas-styleguide-reset"
    :class="b('', modifiers)"
  >
    <teleport
      v-if="$slots.pageConfig"
      defer
      to="#teleportDestinationPageConfigFlyout"
    >
      <slot name="pageConfig"></slot>
    </teleport>
    <h1
      v-if="showHeadline"
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

      modifiers(): Modifiers {
        return {
          padding: this.padding,
          variant: this.variant,
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
  @use 'sass:meta';
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  :where(.vas-styleguide-reset) {
    @include meta.load-css('the-new-css-reset/css/reset');
  }

  .l-vas-layout {
    &--variant-default {
      @include mixins.container;

      height: 100%;
      border-right: 1px solid variables.$vas-color-grayscale--700;
      border-left: 1px solid variables.$vas-color-grayscale--700;
    }

    &--padding-default {
      padding: variables.$vas-spacing--30;
    }

    &--padding-0 {
      padding: 0;
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
        background-color: variables.$vas-theme-background-surface;
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
