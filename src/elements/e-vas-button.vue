<template>
  <component
    :is="type"
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
    <!-- span is required to prevent content shifting in E11. -->
    <span :class="b('inner')">
      <e-vas-progress
        v-if="progress"
        :spacing="0"
        :negative="primary"
      />
      <!-- @slot Button content. -->
      <slot v-else></slot>
    </span>
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
       * A flag to toggle between primary and secondary styling
       */
      primary: {
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
        /**
         * Internal flag to determine hover state.
         */
        hasHover: this.hover,

        /**
         * Internal flag to determine active state.
         */
        isActive: this.active,

        /**
         * Internal flag to determine focus state.
         */
        hasFocus: this.focus,

        /**
         * Determines if the current device uses touch.
         */
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
          primary: this.primary,
          hover: this.hover || this.hasHover,
          focus: this.focus || this.hasFocus,
          active: this.active || this.isActive,
          touch: this.hasTouch,
        };
      },

      /**
       * Returns an Object of attributes.
       */
      attributes(): Attributes {
        return {
          role: this.$attrs.href ? 'button' : null, // Fallback
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
      type(): string {
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
      /**
       * Mouseenter event handler.
       */
      onMouseEnter() {
        this.hasHover = true;
      },

      /**
       * Mouseleave event handler.
       */
      onMouseLeave() {
        this.hasHover = false;
        this.isActive = false;
      },

      /**
       * Mousedown event handler.
       */
      onMouseDown() {
        this.isActive = true;
      },

      /**
       * Mouseup event handler.
       */
      onMouseUp() {
        this.isActive = false;
      },

      /**
       * Focus event handler.
       */
      onFocus() {
        this.hasFocus = true;
      },

      /**
       * Blur event handler.
       */
      onBlur() {
        this.hasHover = false;
        this.hasFocus = false;
      },

      /**
       * Click event handler.
       */
      onClick(event: Event): void {
        this.$el.blur();

        /**
         * Click event
         */
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
    --e-vas-button-font-color: #{variables.$vas-color-grayscale--0};
    --e-vas-button-border-color: #{variables.$vas-color-grayscale--0};
    --e-vas-button-background-color: #{variables.$vas-color-grayscale--700};

    position: relative;
    display: inline-block;
    padding: variables.$vas-form-field-padding (variables.$vas-form-field-padding * 3);
    outline: none;
    border: 1px solid var(--e-vas-button-border-color);
    border-radius: variables.$vas-form-border-radius;
    background-color: var(--e-vas-button-background-color);
    cursor: pointer;
    color: var(--e-vas-button-font-color);
    font-size: variables.$vas-font-size--16;
    text-align: center;

    &:hover {
      text-decoration: none;
    }

    &--focus,
    &:focus {
      --e-vas-button-border-color: #{variables.$vas-color-grayscale--700};
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--600};

      outline: none;
    }

    &:active:not([disabled]),
    &--active:not([disabled]) {
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--600};

      position: relative;
    }

    &--hover:not(&--touch),
    &:hover:not(&--touch) {
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--600};
    }

    &--focus path,
    &--hover:not(&--touch) path,
    &:focus path,
    &:hover:not(&--touch) path {
      fill: var(--e-vas-button-font-color);
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

    &__inner {
      position: relative;
      display: inline-block;
      vertical-align: baseline;
    }

    .e-progress {
      margin-top: -2px; // Creates unified height for text/progress button
      margin-bottom: -1px;
    }
  }

  .e-vas-button--primary {
    --e-vas-button-font-color: #{variables.$vas-color-grayscale--1000};
    --e-vas-button-border-color: #{variables.$vas-color-grayscale--0};
    --e-vas-button-background-color: #{variables.$vas-color-grayscale--0};

    &.e-vas-button:hover:not(.e-vas-button--touch),
    &.e-vas-button--hover:not(.e-vas-button--touch) {
      --e-vas-button-border-color: #{variables.$vas-color-grayscale--100};
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--100};
    }

    &.e-vas-button:active:not([disabled]),
    &.e-vas-button--active:not([disabled]) {
      --e-vas-button-border-color: #{variables.$vas-color-grayscale--100};
      --e-vas-button-background-color: #{variables.$vas-color-grayscale--100};
    }
  }
</style>
