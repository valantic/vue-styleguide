<template>
  <label
    :class="b(modifiers)"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <span :class="b('track')">
      <input
        v-model="internalValue"
        v-bind="$attrs"
        :class="b('input')"
        :aria-checked="internalValue ? 'true' : 'false'"
        type="checkbox"
        @blur="onBlur"
        @focus="onFocus"
      />
      <span :class="b('thumb')">
        <e-vas-icon
          :icon="internalValue ? 'i-check' : 'i-close'"
          :class="b('thumb-icon')"
          :size="internalValue ? '12' : '8'"
        />
      </span>
    </span>
    <span
      v-if="$slots.default || label"
      :class="b('label')"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import useFormStates, { FormStates, withProps } from '../compositions/form-states';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import eVasIcon from './e-vas-icon.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Renders a switch. The label can either be passed with the `label` property or, if it
   * needs markup, as the default slot, which takes precedence. Like in Vuetify, the label
   * is rendered after the track and the thumb carries a check/close icon, so the state is
   * readable without relying on color alone.
   */
  export default defineComponent({
    name: 'e-vas-toggle',

    components: {
      eVasIcon,
    },

    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * The model value to be used for v-model.
       */
      modelValue: {
        type: Boolean,
        default: false,
      },
    },

    emits: {
      'update:modelValue': (value: unknown): boolean => typeof value === 'boolean',
      'focus': (): boolean => true,
      'blur': (): boolean => true,
    },

    setup(props): FormStates {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },
    // data(): Data {
    //   return {};
    // },

    computed: {
      /**
       * Returns a configuration Object for modifier classes.
       */
      modifiers(): Modifiers {
        return {
          ...this.stateModifiers,
          active: this.internalValue,
        };
      },

      internalValue: {
        get(): boolean {
          return this.modelValue;
        },
        set(value: boolean) {
          this.$emit('update:modelValue', value);
        },
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
      onFocus(): void {
        this.focus = true;
        this.$emit('focus');
      },

      onBlur(): void {
        this.focus = false;
        this.$emit('blur');
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/form-field';

  .e-vas-toggle {
    $this: &;
    $e-vas-toggle--track-width: 30px;
    $e-vas-toggle--track-height: 14px;
    $e-vas-toggle--thumb-size: 18px;
    $e-vas-toggle--ripple-size: 8px;

    // The switch has to stay readable on the light *and* the dark theme, so both parts are
    // pinned to fixed grayscale values instead of the theme's text/border colors, which sit
    // too close to the dark background (`--vas-theme-border-color` only reaches 2.3:1 on it).
    // The thumb stays light in both states — it carries the dark check/close icon.
    --e-vas-toggle-track-color: #{variables.$vas-color-grayscale--400};
    --e-vas-toggle-thumb-color: #{variables.$vas-color-grayscale--1000};
    --e-vas-toggle-icon-color: #{variables.$vas-color-grayscale--0};

    display: flex;
    align-items: center;
    gap: variables.$vas-spacing--8;
    cursor: pointer;

    // The thumb is taller than the track and overlaps it, like Vuetify's switch.
    &__track {
      position: relative;
      display: flex;
      flex: none;
      align-items: center;
      width: $e-vas-toggle--track-width;
      height: $e-vas-toggle--track-height;
      border-radius: $e-vas-toggle--track-height;
      background-color: var(--e-vas-toggle-track-color);
      transition: background-color variables.$vas-transition-duration--default;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: inherit;
    }

    &__thumb {
      position: absolute;
      left: calc((#{$e-vas-toggle--thumb-size} - #{$e-vas-toggle--track-height}) / -2);
      display: flex;
      align-items: center;
      justify-content: center;
      width: $e-vas-toggle--thumb-size;
      height: $e-vas-toggle--thumb-size;
      border-radius: 50%;
      background-color: var(--e-vas-toggle-thumb-color);

      // The hairline ring keeps the light thumb separated from the light "on" track of the
      // dark theme, where thumb and track would otherwise only differ by 1.9:1.
      box-shadow:
        0 0 0 1px variables.$vas-shadow-color--default,
        0 1px 2px 1px variables.$vas-shadow-color--default;
      transition: transform variables.$vas-transition-duration--default;
      pointer-events: none;

      // Vuetify's hover/focus ripple around the thumb.
      &::before {
        position: absolute;
        content: '';
        border-radius: 50%;
        background-color: currentcolor;
        opacity: 0;
        transition: opacity form-field.$vas-field-transition--subtle;
        inset: -#{$e-vas-toggle--ripple-size};
      }
    }

    &:hover &__thumb::before {
      opacity: form-field.$vas-field-overlay-opacity;
    }

    &__input:focus-visible ~ &__thumb::before {
      opacity: form-field.$vas-field-overlay-opacity--focus;
    }

    // The icon is the primary on/off signal, the track color the secondary one.
    &__thumb-icon {
      color: var(--e-vas-toggle-icon-color);
    }

    &--active {
      --e-vas-toggle-track-color: var(--vas-theme-text-color);

      #{$this}__thumb {
        transform: translateX(#{$e-vas-toggle--track-width - $e-vas-toggle--thumb-size + 4px});
      }
    }

    &__label {
      @include form-field.selection-label;
    }

    // The `disabled` attribute is forwarded to the hidden input, so the whole control has
    // to be dimmed from the outside.
    &:has(#{$this}__input:disabled) {
      cursor: not-allowed;
      opacity: form-field.$vas-field-opacity--disabled;
    }

    &--state-error &__label {
      color: #{form-field.state-color('error')};
    }
  }
</style>
