<template>
  <c-vas-tooltip
    :text="tooltip || undefined"
    :position="tooltipPosition"
  >
    <component
      :is="href ? 'a' : 'button'"
      :class="b({ [variant]: true, active, disabled, isLink: !!href })"
      v-bind="elementAttrs"
    >
      <e-vas-icon
        v-if="icon"
        :icon="icon"
        :size="iconSize"
      />
      <template v-if="text">
        {{ text }}
      </template>
      <template v-else>
        <slot />
      </template>
    </component>
  </c-vas-tooltip>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import type { Icon } from '../types/icon';
  import cVasTooltip from './c-vas-tooltip.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Generic toolbar action button for panel slots (top, bottom, left, right).
   * Use variant="icon" for square icon-only buttons, variant="fluid" for text or icon+text buttons.
   */
  export default defineComponent({
    name: 'c-vas-panel-action',
    components: {
      cVasTooltip,
      eVasIcon,
    },

    props: {
      /**
       * Square icon-only button or fluid content-width button.
       */
      variant: {
        type: String as PropType<'icon' | 'fluid' | 'fluid-column'>,
        default: 'icon',
      },

      /**
       * Optional icon from the sprite.
       */
      icon: {
        type: String as PropType<Icon>,
        default: null,
      },

      /**
       * Define the icon size in pixels.
       */
      iconSize: {
        type: String,
        default: '14',
      },

      /**
       * Marks the button as active/selected.
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the button.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Tooltip text, also used as aria-label for icon-only buttons.
       */
      tooltip: {
        type: String,
        default: null,
      },

      /**
       * A text to display as a label.
       */
      text: {
        type: String,
        default: null,
      },

      /**
       * Tooltip placement relative to the button.
       */
      tooltipPosition: {
        type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
        default: 'top',
      },

      /**
       * When provided, the component renders as an `<a>` tag instead of `<button>`.
       */
      href: {
        type: String,
        default: null,
      },

      /**
       * Forwarded to the `<a>` element when `href` is set.
       */
      target: {
        type: String,
        default: null,
      },

      /**
       * Forwarded to the `<a>` element when `href` is set.
       */
      rel: {
        type: String,
        default: null,
      },
    },
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      elementAttrs(): Record<string, unknown> {
        if (this.href) {
          return {
            'href': this.href,
            'target': this.target || undefined,
            'rel': this.rel || undefined,
            'aria-label': this.tooltip || undefined,
          };
        }

        return {
          'type': 'button',
          'disabled': this.disabled || undefined,
          'aria-label': this.tooltip || undefined,
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

  .c-vas-panel-action {
    $this: &;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--vas-theme-text-color);
    cursor: pointer;
    padding: 0;
    gap: variables.$vas-spacing--4;
    font-family: inherit;
    font-size: variables.$vas-font-size--small;
    line-height: 1;
    border-radius: variables.$vas-theme-border-radius;
    flex-shrink: 0;

    &--is-link {
      text-decoration: none; // stylelint-disable-line declaration-no-important
      color: var(--vas-theme-text-color) !important; // stylelint-disable-line declaration-no-important
    }

    &:hover:not(#{$this}--disabled) {
      background-color: var(--vas-theme-background-surface-hover);
    }

    &--icon {
      width: 100%;
      aspect-ratio: 1;
      flex-direction: column;
    }

    &--fluid-column {
      width: 100%;
      flex-direction: column;
    }

    &--fluid {
      height: 100%;
      padding: 0 variables.$vas-spacing--6;
      white-space: nowrap;
    }

    &--active {
      color: var(--vas-theme-text-color-highlight);
      background-color: var(--vas-theme-highlight);
    }

    &--disabled {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }
  }
</style>
