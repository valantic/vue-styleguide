<template>
  <component
    :is="domElement"
    :class="b(modifiers)"
    :style="style"
    v-bind="attributes"
    @touchstart.passive="hasTouch = true"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @focus="onFocus"
    @blur="onBlur"
    @click="onClick"
  >
    <e-vas-progress v-if="progress" />
    <slot v-else></slot>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import eVasProgress from './e-vas-progress.vue';

  // type Setup = {};

  type Attributes = {
    role: string | null;
    disabled: boolean;
    [key: string]: string | boolean | null;
  };

  type ElementDimensions = {
    width: string;
    height: string;
  };

  type Data = {
    hasHover: boolean;
    isActive: boolean;
    hasFocus: boolean;
    hasTouch: boolean;
  };

  /**
   * Renders a `<button>` or `<a>` element (based on existing `href` attribute) with button style.
   * The component uses a `<slot>` to render the content.
   *
   * [You can also define inherited attributes for `<button>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/button#Attribute)
   *
   * [You can also define inherited attributes for `<a>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/a#Attribute)
   */
  export default defineComponent({
    name: 'e-vas-button',

    components: {
      eVasProgress,
    },

    props: {
      /**
       * If `true` the button shows a progress animation
       */
      progress: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the hover state
       */
      hover: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the focus state
       */
      focus: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the active state
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the button
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Overwrites the element of the button component.
       * This option to overwrite the default "anchor" or "button" tag should get only used for edge cases where
       * a button has to be inside another anchor tag or similar.
       */
      element: {
        type: String,
        default: null,
      },

      /**
       * Define a variant.
       */
      variant: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'text'].includes(value),
      },

      /**
       * Define a variant.
       */
      color: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'primary'].includes(value),
      },
    },

    emits: {
      click(payload: Event): boolean {
        return typeof payload === 'object';
      },
    },

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        hasHover: this.hover,
        isActive: this.active,
        hasFocus: this.focus,
        hasTouch: false,
      };
    },

    computed: {
      /**
       * Returns an Object of class modifiers.
       */
      modifiers(): Modifiers {
        return {
          progress: this.progress,
          disabled: this.disabled,
          hover: this.hover || this.hasHover,
          focus: this.focus || this.hasFocus,
          active: this.active || this.isActive,
          touch: this.hasTouch,
          variant: this.variant,
          color: this.color,
        };
      },

      /**
       * Returns an Object of attributes.
       */
      attributes(): Attributes {
        return {
          role: this.$attrs.href ? 'button' : null,
          ...this.$attrs,
          disabled: this.disabled,
        };
      },

      /**
       * Returns inline styles to keep dimensions during progress state.
       */
      style(): ElementDimensions | null {
        return this.progress ? this.getElementDimensions() : null;
      },

      /**
       * Gets the type of the component (DOM element).
       */
      domElement(): string {
        return this.element || (this.$attrs.href ? 'a' : 'button');
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
      onMouseEnter(): void {
        this.hasHover = true;
      },

      onMouseLeave(): void {
        this.hasHover = false;
        this.isActive = false;
      },

      onMouseDown(): void {
        this.isActive = true;
      },

      onMouseUp(): void {
        this.isActive = false;
      },

      onFocus(): void {
        this.hasFocus = true;
      },

      onBlur(): void {
        this.hasHover = false;
        this.hasFocus = false;
      },

      onClick(event: Event): void {
        this.$el.blur();
        this.$emit('click', event);
      },

      /**
       * Returns the current width and height of the button.
       */
      getElementDimensions(): ElementDimensions | null {
        const element = this.$el;

        return element ? { width: `${element.offsetWidth}px`, height: `${element.offsetHeight}px` } : null;
      },
    },
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .e-vas-button {
    --e-vas-button-font-color: #{variables.$vas-theme-text-color};
    --e-vas-button-border-color: #{variables.$vas-color-grayscale--600};
    --e-vas-button-background-color: #{variables.$vas-color-grayscale--600};

    position: relative;
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    padding: variables.$vas-form-field-padding (variables.$vas-form-field-padding * 3);
    outline: none;
    border: 1px solid var(--e-vas-button-border-color);
    border-radius: variables.$vas-theme-border-radius;
    background-color: var(--e-vas-button-background-color);
    cursor: pointer;
    color: var(--e-vas-button-font-color);
    font-size: variables.$vas-font-size--16;
    transition-property: background-color, transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    user-select: none;

    &:hover {
      text-decoration: none;
    }

    &--hover:not(&--touch),
    &:hover:not(&--touch) {
      --e-vas-button-border-color: #{variables.$vas-color-grayscale--700};
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--700};
    }

    &--focus,
    &:focus {
      --e-vas-button-border-color: #{variables.$vas-color-grayscale--700};
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--600};

      outline: none;
    }

    &--focus path,
    &--hover:not(&--touch) path,
    &:focus path,
    &:hover:not(&--touch) path {
      fill: var(--e-vas-button-font-color);
    }

    &:active:not([disabled]),
    &--active:not([disabled]) {
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--600};

      position: relative;
    }

    &[disabled],
    &--disabled,
    &[disabled]:hover,
    &--disabled:hover {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }

    &--progress,
    &--progress[disabled],
    &--progress[disabled]:hover,
    &--progress[disabled]:focus,
    &--progress:hover,
    &--progress:focus {
      overflow: hidden; // Prevents overflow of animation
      cursor: default;
      pointer-events: none;
    }

    .e-progress {
      margin-top: -2px; // Creates unified height for text/progress button
      margin-bottom: -1px;
    }
  }

  .e-vas-button--variant-default {
    // e-vas-button--color-default is the base setup for a button.

    &.e-vas-button--color-primary {
      --e-vas-button-font-color: #{variables.$vas-color-grayscale--1000};
      --e-vas-button-border-color: #{variables.$vas-color-grayscale--0};
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--0};

      &.e-vas-button:hover:not(.e-vas-button--touch),
      &.e-vas-button--hover:not(.e-vas-button--touch) {
        --e-vas-button-border-color: #{variables.$vas-color-grayscale--200};
        --e-vas-button-background-color: #{variables.$vas-color-grayscale--200};
      }

      &.e-vas-button:active:not([disabled]),
      &.e-vas-button--active:not([disabled]) {
        --e-vas-button-border-color: #{variables.$vas-color-grayscale--200};
        --e-vas-button-background-color: #{variables.$vas-color-grayscale--200};
      }
    }
  }

  .e-vas-button--variant-text {
    &.e-vas-button--color-default {
      --e-vas-button-font-color: #{variables.$vas-theme-text-color};
      --e-vas-button-border-color: transparent;
      --e-vas-button-background-color: transparent;

      &.e-vas-button:hover:not(.e-vas-button--touch),
      &.e-vas-button--hover:not(.e-vas-button--touch) {
        --e-vas-button-border-color: transparent;
        --e-vas-button-background-color: #{variables.$vas-color-grayscale--700};
      }

      &.e-vas-button:active:not([disabled]),
      &.e-vas-button--active:not([disabled]) {
        --e-vas-button-border-color: transparent;
        --e-vas-button-background-color: #{variables.$vas-color-grayscale--600};
      }
    }

    &.e-vas-button--color-primary {
      --e-vas-button-font-color: #{variables.$vas-theme-text-color};
      --e-vas-button-border-color: transparent;
      --e-vas-button-background-color: transparent;

      &.e-vas-button:hover:not(.e-vas-button--touch),
      &.e-vas-button--hover:not(.e-vas-button--touch) {
        --e-vas-button-border-color: transparent;
        --e-vas-button-background-color: #{variables.$vas-color-grayscale--500};
      }

      &.e-vas-button:active:not([disabled]),
      &.e-vas-button--active:not([disabled]) {
        --e-vas-button-border-color: transparent;
        --e-vas-button-background-color: #{variables.$vas-color-grayscale--500};
      }
    }
  }
</style>
