<template>
  <label
    :class="b(modifiers)"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <input
      v-model="internalValue"
      v-bind="$attrs"
      :class="b('field', fieldModifiers)"
      :value="value"
      :name="name"
      type="radio"
      @change="onChange"
    />
    <span :class="b('indicator')"></span>
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
  import { FormStates } from '../compositions/form-states';
  import useFormStates, { withProps } from '../compositions/form-states';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  /**
   * Renders a radio element. Use a v-for loop to generate a set of radio buttons.
   * The displayed name can either be provided by the property `label` or as the default slot,
   * which takes precedence.
   */
  export default defineComponent({
    name: 'e-vas-radio',

    // components: {},
    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * The model value to be used for v-model.
       */
      modelValue: {
        type: [String, Number],
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
        type: [String, Number, Boolean],
        required: true,
      },
    },

    emits: {
      'update:modelValue': (value: string | number): boolean => ['string', 'number'].includes(typeof value),
      'change': (value: string | number): boolean => ['string', 'number'].includes(typeof value),
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
      internalValue: {
        get(): string | number {
          return this.modelValue;
        },
        set(value: string): void {
          this.$emit('update:modelValue', value);
        },
      },

      modifiers(): Modifiers {
        return {
          ...this.stateModifiers,
          selected: this.internalValue === this.value,
        };
      },

      /**
       * Returns all modifiers for the field class.
       */
      fieldModifiers(): Modifiers {
        return {
          selected: this.internalValue === this.value,
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

    methods: {
      onChange(event: Event): void {
        const radioButton = event.currentTarget as HTMLSelectElement;

        this.$emit('change', radioButton.value);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/form-field';

  .e-vas-radio {
    $this: &;
    $e-vas-radio--indicator-size: 18px;
    $e-vas-radio--ripple-size: 8px;

    position: relative;
    display: flex;
    align-items: center;
    gap: variables.$vas-spacing--8;
    cursor: pointer;

    &__field {
      position: absolute;
      left: -200vw;
      -webkit-appearance: none;
    }

    &__indicator {
      position: relative;
      display: flex;
      flex: 0 0 auto;
      width: $e-vas-radio--indicator-size;
      height: $e-vas-radio--indicator-size;
      border: 2px solid var(--vas-theme-text-color);
      border-radius: 50%;
      transition: border-color form-field.$vas-field-transition;
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
        inset: -#{$e-vas-radio--ripple-size};
      }

      // Selected dot.
      &::after {
        position: absolute;
        content: '';
        border-radius: 50%;
        background-color: var(--vas-theme-text-color);
        transform: scale(0);
        transition: transform 100ms ease-in-out;
        inset: 2px;
      }
    }

    &:hover &__indicator::before {
      opacity: form-field.$vas-field-overlay-opacity;
    }

    &__field:focus-visible ~ &__indicator::before {
      opacity: form-field.$vas-field-overlay-opacity--focus;
    }

    &__field:checked ~ &__indicator {
      opacity: 1;

      &::after {
        transform: scale(1);
      }
    }

    &__label {
      @include form-field.selection-label;

      display: block;
      margin: 0;
    }

    &__field:disabled {
      ~ #{$this}__indicator,
      ~ #{$this}__label {
        cursor: not-allowed;
        opacity: form-field.$vas-field-opacity--disabled;
      }
    }

    &--state-error {
      #{$this}__label {
        color: #{form-field.state-color('error')};
      }

      #{$this}__indicator {
        border-color: #{form-field.state-color('error')};
      }
    }
  }
</style>
