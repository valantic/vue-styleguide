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
      v-if="showHeadline"
      :class="b('headline')"
    >
      {{ routeName }}
    </h1>
    <slot></slot>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'l-vas-layout',

    // components: {},

    props: {
      /**
       * Define content padding class.
       */
      padding: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', '0'].includes(value),
      },

      /**
       * Define content padding class.
       */
      variant: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'plain'].includes(value),
      },

      /**
       * Define if the headline should be shown.
       */
      showHeadline: {
        type: Boolean,
        default: true,
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
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

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
