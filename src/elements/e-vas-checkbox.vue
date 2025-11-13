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
    <span :class="b('label-text')">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import { PropType, defineComponent, toRefs } from 'vue';
  import useFormStates, { FormStates, withProps } from '../compositions/form-states';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  /**
   * Checkbox component for form elements.
   * Can be used as single element with a Boolean value or multiple checkboxes with an Array.
   */
  export default defineComponent({
    name: 'e-vas-checkbox',

    inheritAttrs: false,

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
        required: true,
      },

      /**
       * Allows to set the desired layout variant.
       */
      variant: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'toggle'].includes(value),
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
      isChecked() {
        return Array.isArray(this.value) ? this.value.includes(this.modelValue) : this.value;
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
       * Emits focus to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onFocus() {
        this.focus = true;

        /**
         * Focus event
         */
        this.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onBlur() {
        this.focus = false;

        /**
         * Blur event.
         */
        this.$emit('blur');
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:math';
  @use '../setup/scss/variables';

  .e-vas-checkbox {
    $this: &;
    $e-vas-checkbox--label-size: 20px;
    $e-vas-checkbox--toggle-size: 1rem;

    position: relative;
    display: block;
    margin-bottom: 8px;
    cursor: pointer;
    font-size: variables.$vas-font-size--16;

    &__field {
      position: absolute;
      left: -200vw;
      visibility: hidden;
    }

    &--variant-default {
      display: flex;
      align-items: center;

      #{$this}__indicator {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        width: $e-vas-checkbox--label-size;
        height: $e-vas-checkbox--label-size;
        border: 1px solid variables.$vas-form-border-color;
        border-radius: variables.$vas-form-border-radius;
        background: variables.$vas-color-grayscale--1000;

        &::before {
          content: '';
          width: $e-vas-checkbox--label-size;
          height: $e-vas-checkbox--label-size;
          opacity: 0;
          border: 1px solid transparent;
          border-radius: 3px;
          background: variables.$vas-color-grayscale--0;
          transform: scale(0);
          transition-timing-function: ease-in-out;
          transition-duration: 100ms;
          transition-property: opacity, transform;
          inset: 0;
        }
      }

      #{$this}__field:checked {
        ~ #{$this}__indicator::before {
          opacity: 1;
          transform: scale(0.6);
        }
      }
    }

    &--variant-toggle {
      display: flex;
      align-items: center;
      cursor: pointer;

      #{$this}__indicator {
        position: relative;
        width: calc(1.5 * #{$e-vas-checkbox--toggle-size});
        height: math.div($e-vas-checkbox--toggle-size, 3) * 2;
        margin: 0 math.div($e-vas-checkbox--toggle-size, 2);
        border-radius: $e-vas-checkbox--toggle-size;
        background-color: variables.$vas-color-grayscale--500;
        transition: background-color variables.$vas-transition-duration--default;

        &::before {
          position: absolute;
          top: 50%;
          left: math.div($e-vas-checkbox--toggle-size, -2);
          content: '';
          width: $e-vas-checkbox--toggle-size;
          height: $e-vas-checkbox--toggle-size;
          border-radius: 50%;
          background-color: variables.$vas-color-grayscale--1000;
          box-shadow: 0 1px 2px 1px rgba(variables.$vas-color-grayscale--0, 0.2);
          transform: translateY(-50%);
          transition: left variables.$vas-transition-duration--default;
        }
      }

      #{$this}__field {
        &:checked ~ #{$this}__indicator {
          &::before {
            left: calc(100% - (#{$e-vas-checkbox--toggle-size} / 2));
            background-color: variables.$vas-color-grayscale--0;
            transform: translateY(-50%);
          }
        }
      }
    }

    &__label-text {
      display: block;
      margin: 0;
      padding-left: variables.$vas-spacing--10;

      &:hover {
        color: variables.$vas-color-grayscale--0;

        &::before {
          border-color: variables.$vas-color-grayscale--0;
        }
      }
    }

    &__field:checked {
      ~ #{$this}__label-text {
        color: variables.$vas-color-grayscale--0;
      }
    }

    &__field:checked:disabled {
      ~ #{$this}__indicator {
        border-color: variables.$vas-color-grayscale--500;
      }

      ~ #{$this}__indicator:before {
        background: variables.$vas-color-grayscale--500;
        cursor: not-allowed;
      }
    }

    &__field:disabled {
      ~ #{$this}__indicator {
        border-color: variables.$vas-color-grayscale--500;
        cursor: not-allowed;
      }

      ~ #{$this}__label-text {
        cursor: not-allowed;
        color: variables.$vas-color-grayscale--400;

        &::before {
          border-color: variables.$vas-color-grayscale--500;
        }
      }
    }
  }
</style>
