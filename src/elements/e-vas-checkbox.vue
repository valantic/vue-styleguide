<template>
  <label
    :class="b(modifiers)"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <input
      v-model="internalValue"
      v-bind="$attrs"
      :class="b('field')"
      :aria-checked="isChecked ? 'true' : 'false'"
      :value="value"
      :name="name"
      type="checkbox"
      @blur="onBlur"
      @focus="onFocus"
    />
    <span :class="b('indicator')"></span>
    <span
      v-if="$slots.default || label"
      :class="b('label-text')"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
  import { PropType, defineComponent, toRefs } from 'vue';
  import { FormStates } from '../compositions/form-states';
  import useFormStates, { withProps } from '../compositions/form-states';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  export const CHECKBOX_VARIANTS: string[] = ['default', 'toggle'];
  export type CheckboxVariantType = (typeof CHECKBOX_VARIANTS)[number];

  /**
   * Checkbox component for form elements.
   * Can be used as single element with a Boolean value or multiple checkboxes with an Array.
   *
   * The label can either be passed with the `label` property or, if it needs markup, as the
   * default slot. The slot takes precedence.
   */
  export default defineComponent({
    name: 'e-vas-checkbox',

    inheritAttrs: false,

    // components: {},

    props: {
      ...withProps(),

      /**
       * The model value to be used for v-model.
       */
      modelValue: {
        type: [Boolean, Array] as PropType<any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- was not able to find a better solution, since the value is very dynamic
        required: true,
      },

      /**
       * Adds name attribute.
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Adds value attribute.
       */
      value: {
        type: [String, Number, Boolean] as PropType<any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- was not able to find a better solution, since the value is very dynamic
        default: true,
      },

      /**
       * Allows to set the desired layout variant.
       */
      variant: {
        type: String as PropType<CheckboxVariantType>,
        default: 'default',
        validator: (value: string) => CHECKBOX_VARIANTS.includes(value),
      },
    },

    emits: {
      'update:modelValue': (payload: unknown): boolean => payload !== undefined,
      'change': (payload: unknown): boolean => payload !== undefined,
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
          variant: this.variant,
        };
      },

      /**
       * Sets value of component model to parent model
       */
      internalValue: {
        get(): boolean | string[] | number[] {
          return this.modelValue;
        },
        set(value: boolean | string[] | number[]) {
          /**
           * Emits checkbox value e.g. true/false or value
           */
          this.$emit('update:modelValue', value);

          // event needed for the multiselect
          this.$emit('change', value);
        },
      },

      /**
       * Evaluates if the checkbox is currently selected.
       */
      isChecked(): boolean {
        return Array.isArray(this.modelValue) ? this.modelValue.includes(this.value) : this.modelValue;
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
  @use 'sass:math';
  @use '../setup/scss/variables';
  @use '../setup/scss/form-field';

  .e-vas-checkbox {
    $this: &;
    $e-vas-checkbox--indicator-size: 18px;
    $e-vas-checkbox--ripple-size: 8px;
    $e-vas-checkbox--toggle-size: 1rem;

    position: relative;
    display: flex;
    align-items: center;
    gap: variables.$vas-spacing--8;
    margin-bottom: variables.$vas-spacing--8;
    cursor: pointer;

    &__field {
      position: absolute;
      left: -200vw;
      visibility: hidden;
    }

    &__label-text {
      @include form-field.selection-label;

      display: block;
      margin: 0;
    }

    &--variant-default {
      #{$this}__indicator {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: $e-vas-checkbox--indicator-size;
        height: $e-vas-checkbox--indicator-size;
        border: 2px solid var(--vas-theme-text-color);
        border-radius: 2px;
        transition:
          background-color form-field.$vas-field-transition,
          border-color form-field.$vas-field-transition;
        opacity: form-field.$vas-field-emphasis--medium;

        // Vuetify's hover/focus ripple around the control.
        &::before {
          position: absolute;
          content: '';
          border-radius: 50%;
          background-color: currentcolor;
          opacity: 0;
          transition: opacity form-field.$vas-field-transition--subtle;
          pointer-events: none;
          inset: -#{$e-vas-checkbox--ripple-size};
        }

        // Checkmark.
        &::after {
          position: absolute;
          top: 45%;
          left: 50%;
          content: '';
          width: 5px;
          height: 9px;
          border: solid var(--vas-theme-background-content);
          border-width: 0 2px 2px 0;
          transform: translate(-50%, -50%) rotate(45deg) scale(0);
          transition: transform 100ms ease-in-out;
        }
      }

      &:hover #{$this}__indicator::before {
        opacity: form-field.$vas-field-overlay-opacity;
      }

      #{$this}__field:focus-visible ~ #{$this}__indicator::before {
        opacity: form-field.$vas-field-overlay-opacity--focus;
      }

      #{$this}__field:checked ~ #{$this}__indicator {
        border-color: var(--vas-theme-text-color);
        background-color: var(--vas-theme-text-color);
        opacity: 1;

        &::after {
          transform: translate(-50%, -50%) rotate(45deg) scale(1);
        }
      }
    }

    &--variant-toggle {
      #{$this}__indicator {
        position: relative;
        width: calc(1.5 * #{$e-vas-checkbox--toggle-size});
        height: math.div($e-vas-checkbox--toggle-size, 3) * 2;
        margin: 0 math.div($e-vas-checkbox--toggle-size, 2);
        border-radius: $e-vas-checkbox--toggle-size;
        background-color: var(--vas-theme-border-color);
        transition: background-color variables.$vas-transition-duration--default;

        &::before {
          position: absolute;
          top: 50%;
          left: math.div($e-vas-checkbox--toggle-size, -2);
          content: '';
          width: $e-vas-checkbox--toggle-size;
          height: $e-vas-checkbox--toggle-size;
          border-radius: 50%;
          background-color: var(--vas-theme-background-content);
          box-shadow: 0 1px 2px 1px variables.$vas-shadow-color--default;
          transform: translateY(-50%);
          transition: left variables.$vas-transition-duration--default;
        }
      }

      #{$this}__field {
        &:checked ~ #{$this}__indicator {
          &::before {
            left: calc(100% - (#{$e-vas-checkbox--toggle-size} / 2));
            background-color: var(--vas-theme-text-color);
            transform: translateY(-50%);
          }
        }
      }
    }

    &__field:disabled {
      ~ #{$this}__indicator,
      ~ #{$this}__label-text {
        cursor: not-allowed;
        opacity: form-field.$vas-field-opacity--disabled;
      }
    }

    &--state-error {
      #{$this}__label-text {
        color: #{form-field.state-color('error')};
      }

      #{$this}__indicator {
        border-color: #{form-field.state-color('error')};
      }
    }
  }
</style>
