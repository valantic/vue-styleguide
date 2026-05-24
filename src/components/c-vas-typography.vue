<template>
  <component
    :is="tag"
    :class="b(modifiers)"
    ><slot
  /></component>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import type { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  export const TYPOGRAPHY_VARIANTS: string[] = ['heading', 'label', 'body', 'small', 'tiny'];
  export type TypographyVariantType = (typeof TYPOGRAPHY_VARIANTS)[number];

  /**
   * Text styling primitive for all typography variants. Renders as div or span; never uses semantic heading tags.
   */
  export default defineComponent({
    name: 'c-vas-typography',

    // components: {},

    props: {
      /** Visual text style variant. */
      variant: {
        type: String as PropType<TypographyVariantType>,
        default: 'body',
        validator: (value: string) => TYPOGRAPHY_VARIANTS.includes(value),
      },
      /** HTML tag to render. Use 'span' for inline contexts. */
      tag: {
        type: String as PropType<'div' | 'span'>,
        default: 'div',
      },
    },
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      modifiers(): Modifiers {
        return { variant: this.variant };
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

  .c-vas-typography {
    &--variant-heading {
      font-size: variables.$vas-font-size--heading;
      font-weight: variables.$vas-font-weight--bold;
      color: var(--vas-theme-text-color-muted);
      margin-bottom: variables.$vas-spacing--10;
    }

    &--variant-label {
      font-size: variables.$vas-font-size--label;
    }

    &--variant-body {
      font-size: variables.$vas-font-size--base;
    }

    &--variant-small {
      font-size: variables.$vas-font-size--small;
    }

    &--variant-tiny {
      font-size: variables.$vas-font-size--tiny;
    }
  }
</style>
