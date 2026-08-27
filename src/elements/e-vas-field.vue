<template>
  <span :class="b(modifiers)">
    <span :class="b('overlay')"></span>
    <span :class="b('control')">
      <label
        v-if="label"
        :id="labelId"
        :for="fieldId"
        :class="b('label')"
      >
        {{ label }}
      </label>
      <slot></slot>
      <span
        v-if="$slots.append"
        :class="b('append')"
      >
        <slot name="append"></slot>
      </span>
    </span>
    <span :class="b('outline')"></span>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { withProps } from '../compositions/form-states';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  /**
   * Renders the shared shell of a form field: the filled surface, the floating label and the
   * underline. It is a port of Vuetify's `filled` field variant and is not meant to be used
   * directly — `e-vas-input`, `e-vas-textarea`, `e-vas-select` and `e-vas-multiselect` wrap
   * their control with it so the label behaviour only exists in one place.
   *
   * The control itself is passed via the default slot and is styled by this component, so it
   * has to be a direct child (`input`, `select`, `textarea` or `button`).
   *
   * The root is a `span` with `display: block`, so the field stays valid markup inside
   * phrasing content as well (e.g. within the `e-vas-multiselect` wrapper).
   */
  export default defineComponent({
    name: 'e-vas-field',

    // components: {},

    props: {
      ...withProps(),

      /**
       * The `id` of the control the label belongs to.
       */
      fieldId: {
        type: String,
        default: null,
      },

      /**
       * The `id` given to the rendered label, to reference it via `aria-labelledby` for
       * controls which can't be targeted by a `for` attribute.
       */
      labelId: {
        type: String,
        default: null,
      },

      /**
       * Floats the label out of the field. Set it whenever the field holds a value or is
       * focused, mirroring Vuetify's `v-field--active`.
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Highlights the field as focused (full underline, colored bottom line).
       */
      focused: {
        type: Boolean,
        default: false,
      },

      /**
       * Dims the field and blocks pointer events.
       */
      disabled: {
        type: Boolean,
        default: false,
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
      /**
       * Returns a configuration Object for modifier classes.
       *
       * The field is fully controlled by the element wrapping it, so it does not track any
       * state of its own — `useFormStates` is intentionally not used here.
       * Modifier keys are kebab-case because the BEM plugin runs without `hyphenate`.
       */
      modifiers(): Modifiers {
        return {
          'state': this.state,
          'focus': this.focused,
          'active': this.active,
          'disabled': this.disabled,
          'has-label': !!this.label,
          'has-append': !!this.$slots.append,
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
  @use '../setup/scss/form-field';

  .e-vas-field {
    $this: &;

    @include form-field.tokens;

    // Deliberately square: the filled surface, the underline and the label already carry
    // enough shape, and rounded top corners only added noise.
    position: relative;
    display: block;
    color: var(--vas-theme-text-color);
    font-family: variables.$vas-font-family--sidebar;
    font-size: var(--e-vas-field-font-size);

    // The tinted surface of the filled variant.
    &__overlay {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: currentcolor;
      opacity: form-field.$vas-field-overlay-opacity;
      transition: opacity form-field.$vas-field-transition--subtle;
      pointer-events: none;
    }

    &:hover &__overlay {
      opacity: form-field.$vas-field-overlay-opacity--hover;
    }

    &--focus &__overlay {
      opacity: form-field.$vas-field-overlay-opacity--focus;
    }

    &__control {
      position: relative;
      display: flex;
      align-items: stretch;
      min-height: var(--e-vas-field-min-height);
    }

    // Styles whichever control got passed into the default slot.
    // `:where()` keeps the specificity at zero so the elements can still style themselves.
    &__control > :where(input, select, textarea, button) {
      flex: 1 1 auto;
      min-width: 0;
      width: 100%;
      padding: var(--e-vas-field-input-padding-top) var(--e-vas-field-padding-inline) var(--e-vas-field-padding-bottom);
      border: 0;
      background-color: transparent;
      color: var(--vas-theme-text-color);
      font-family: inherit;
      font-size: inherit;
      line-height: var(--e-vas-field-line-height);
      appearance: none;

      // The control is only as wide as the field minus its append, so it must not draw the
      // focus ring itself — the field does that below, across its whole width.
      &:active,
      &:focus,
      &:focus-visible {
        outline: none;
      }
    }

    &:has(&__control > :where(input, select, textarea, button):focus-visible) {
      outline: form-field.$vas-field-focus-ring-width solid
        color-mix(in srgb, var(--e-vas-field-state-color) form-field.$vas-field-focus-ring-strength, transparent);
      outline-offset: form-field.$vas-field-focus-ring-offset;
    }

    // Without a label the value gets centered instead of pushed down.
    &:not(&--has-label) &__control > :where(input, select, textarea, button) {
      padding-top: calc((var(--e-vas-field-input-padding-top) + var(--e-vas-field-padding-bottom)) / 2);
      padding-bottom: calc((var(--e-vas-field-input-padding-top) + var(--e-vas-field-padding-bottom)) / 2);
    }

    &__label {
      // Anchored to the top (not centered) so a multiline control keeps its label
      // on the first line instead of pushing it into the middle of the field.
      position: absolute;
      top: calc((var(--e-vas-field-min-height) - (1em * var(--e-vas-field-line-height))) / 2);
      left: var(--e-vas-field-padding-inline);
      z-index: 1;
      max-width: calc(100% - (2 * var(--e-vas-field-padding-inline)));
      overflow: hidden;
      color: var(--e-vas-field-state-color);
      line-height: var(--e-vas-field-line-height);
      white-space: nowrap;
      text-overflow: ellipsis;
      opacity: form-field.$vas-field-emphasis--medium;
      transform-origin: left center;
      transition:
        transform form-field.$vas-field-transition,
        opacity form-field.$vas-field-transition,
        color form-field.$vas-field-transition;
      pointer-events: none;
    }

    // Vuetify shrinks the label instead of moving it to a second element. Scaling via
    // `transform` (rather than `font-size`) keeps the movement animatable.
    &--active &__label {
      transform: translateY(calc(-1 * var(--e-vas-field-label-float))) scale(form-field.$vas-field-label-scale);
    }

    &--focus &__label {
      opacity: 1;
    }

    &__outline {
      position: absolute;
      inset: 0;
      pointer-events: none;

      // Resting underline.
      &::before {
        position: absolute;
        content: '';
        border-style: solid;
        border-width: 0 0 1px;
        border-color: var(--e-vas-field-state-color);
        opacity: form-field.$vas-field-border-opacity;
        transition: opacity form-field.$vas-field-transition--subtle;
        inset: 0;
      }

      // Focus underline, revealed by scaling it out from the center.
      &::after {
        position: absolute;
        content: '';
        border-style: solid;
        border-width: 0 0 2px;
        border-color: var(--e-vas-field-state-color);
        transform: scaleX(0);
        transition: transform form-field.$vas-field-transition;
        inset: 0;
      }
    }

    &:hover &__outline::before {
      opacity: form-field.$vas-field-emphasis--high;
    }

    &--focus &__outline::before {
      opacity: 1;
    }

    &--focus &__outline::after {
      transform: scaleX(1);
    }

    // Trailing content (chevron, progress, unit). Sits next to the control instead of on
    // top of it, so it never has to be measured to keep the value from running underneath.
    &__append {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      padding-right: var(--e-vas-field-padding-inline);
      color: var(--vas-theme-text-color);
      opacity: form-field.$vas-field-emphasis--medium;
      user-select: none;
      pointer-events: none;
    }

    &--has-append &__control > :where(input, select, textarea, button) {
      padding-right: 0;
    }

    &--disabled {
      opacity: form-field.$vas-field-opacity--disabled;
      pointer-events: none;

      #{$this}__outline::before {
        border-style: dashed;
      }
    }

    &--state-error {
      --e-vas-field-state-color: #{form-field.state-color('error')};
    }

    &--state-success {
      --e-vas-field-state-color: #{form-field.state-color('success')};
    }

    &--state-warning {
      --e-vas-field-state-color: #{form-field.state-color('warning')};
    }

    &--state-info {
      --e-vas-field-state-color: #{form-field.state-color('info')};
    }
  }
</style>
