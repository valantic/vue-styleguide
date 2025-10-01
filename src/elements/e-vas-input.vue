<template>
  <span :class="b(modifiers)">
    <input
      v-model="internalValue"
      ref="input"
      :autocomplete="autocomplete"
      :class="b('field')"
      :name="name"
      :title="title"
      v-bind="$attrs"
      :autofocus="autofocus"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @keyup.enter="onEnterKeyUp"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    />

    <span
      v-if="$slots.default || !hasDefaultState"
      ref="slot"
      :class="b('slot-wrapper')"
    >
      <span
        v-if="$slots.default"
        :class="b('slot')"
      >
        <!-- @slot Use this slot for Content next to the input value. For e.g. icons or units. -->
        <slot></slot>
      </span>
    </span>
  </span>
</template>

<script lang="ts">
  import { Ref, defineComponent, ref, toRefs } from 'vue';
  import useFormStates, { FormStates, withProps } from '../compositions/form-states';
  import propScale from '../helpers/prop.scale';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  type Setup = FormStates & {
    input: Ref<HTMLInputElement | null>;
    slot: Ref<HTMLSpanElement | null>;
    slotStart: Ref<HTMLSpanElement | null>;
  };

  type Data = {
    internalValue: string;
  };

  /**
   * Input form component
   */
  export default defineComponent({
    name: 'e-vas-input',

    // components: {},

    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      modelValue: {
        default: null,
        type: String,
      },

      /**
       * Adds name attribute
       */
      name: {
        required: true,
        type: String,
      },

      /**
       *  Adds title attribute
       */
      title: {
        default: null,
        type: String,
      },

      /**
       * Adds autocomplete
       * Please refer to:
       * [HTML5 input autocomplete](https://developer.mozilla.org/de/docs/Web/HTML/Element/Input#attr-autocomplete)
       */
      autocomplete: {
        type: String,
        default: 'off',
      },

      /**
       * Defines the border Style
       *
       * Available values: [0, 500]
       * Default: 500
       */
      border: propScale(500, [0, 500]),

      /**
       * Option for selecting value text on focus.
       */
      selectOnFocus: {
        type: Boolean,
        default: false,
      },

      /**
       * Hides the native browser control with CSS.
       *
       * Currently supported: `input[type="number"]`
       */
      noNativeControl: {
        type: Boolean,
        default: false,
      },

      /**
       * Set auto focus.
       */
      autofocus: {
        type: Boolean,
        default: false,
      },
    },

    emits: {
      'update:modelValue': (payload: string) => typeof payload === 'string',
      'focus': () => true,
      'blur': () => true,
      'enter': () => true,
    },

    setup(props): Setup {
      const input = ref();
      const slot = ref();
      const slotStart = ref();

      return {
        ...useFormStates(toRefs(props).state),
        input,
        slot,
        slotStart,
      };
    },

    data(): Data {
      return {
        internalValue: this.modelValue,
      };
    },
    computed: {
      /**
       * Defines state modifier classes.
       */
      modifiers(): Modifiers {
        const { border, noNativeControl } = this;

        return {
          ...this.stateModifiers,
          type: this.$attrs.type !== null || 'text',
          border,
          noNativeControl,
        };
      },
    },
    watch: {
      /**
       * Updates internal value if model value got changed from parent.
       */
      modelValue(value: string) {
        if (value !== this.internalValue) {
          this.internalValue = value;
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      /**
       * Calls the "setSlotSpacings" in a timeout function with a delay of 200ms because without
       * it's not working on iOS
       */
      this.setSlotSpacings();
      setTimeout(this.setSlotSpacings, 200);

      window.addEventListener('resizeend', this.setSlotSpacings);
    },
    // beforeUpdate() {},
    updated() {
      setTimeout(this.setSlotSpacings);
    },
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    unmounted() {
      window.removeEventListener('resizeend', this.setSlotSpacings);
    },

    methods: {
      /**
       * Emits input to parent component.
       */
      onInput(event: Event) {
        const target = event.target as HTMLInputElement;

        this.internalValue = target.value;

        /**
         * input event fires on input
         */
        this.$emit('update:modelValue', target.value);
      },

      /**
       * Emits focus to parent and wrapper component.
       * Update "focus" state.
       */
      onFocus() {
        this.focus = true;

        if (this.selectOnFocus) {
          this.selectValue();
        }

        /**
         * "focus" event fires on focus.
         *
         * @event focus
         */
        this.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component.
       * Update "focus" state.
       */
      onBlur() {
        this.focus = false;

        /**
         * blur event fires on blur
         *
         * @event blur
         */
        this.$emit('blur');
      },

      /**
       * Emits enter key event to parent and wrapper component.
       */
      onEnterKeyUp() {
        /**
         * Enter keyboard event gets fired if user clicks on enter or num-pad enter.
         *
         * @event enter
         */
        this.$emit('enter');
      },

      /**
       * Calculates the width of the slot content and sets it as a padding-right to the input-field.
       */
      setSlotSpacings() {
        if (this.slot) {
          const slotWidth = this.slot.clientWidth;

          if (this.input) {
            this.input.style.paddingRight = `${slotWidth + 10}px`;
          }
        }

        if (this.slotStart) {
          const slotWidth = this.slotStart.clientWidth;

          if (this.input) {
            this.input.style.paddingLeft = `${slotWidth + 15}px`;
          }
        }
      },

      /**
       * Selects the value of the input field.
       */
      selectValue() {
        if (this.modelValue) {
          // Needed to select a number value on Chrome.
          this.input?.select();

          // Timeout is needed that it works on all browsers (without there are problems on Safari, Edge, iOS)
          if ('ontouchstart' in window) {
            setTimeout(() => {
              const selectionRange = typeof this.modelValue === 'string' ? this.modelValue.length : this.modelValue;

              this.input?.setSelectionRange(0, selectionRange);
            });
          }
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .e-vas-input {
    $this: &;

    position: relative;
    display: block;

    &--border-0 &__field {
      border: 1px solid transparent;
    }

    // input
    &__field {
      font-size: variables.$vas-font-size--16;
      position: relative;
      width: 100%;
      padding: variables.$vas-form-field-padding;
      border: 1px solid variables.$vas-color-grayscale--500;
      border-radius: variables.$vas-form-border-radius;
      color: variables.$vas-color-grayscale--0;
      font-family: variables.$vas-font-family--primary;

      // disable iPhone styling
      -webkit-appearance: none;

      // sets proper input color for safari
      -webkit-text-fill-color: initial;
    }

    // remove x on in put field within IE
    &__field::-ms-clear {
      display: none;
      width: 0;
      height: 0;
    }

    // Hide autofill Safari icon
    // noinspection CssInvalidPseudoSelector
    &__field::-webkit-contacts-auto-fill-button {
      position: absolute;
      right: 0;
      visibility: hidden;
      pointer-events: none;
    }

    // placeholder (has to be split in seperate blocks to work on each browser)
    &__field::-webkit-input-placeholder {
      // WebKit, Blink, Edge
      opacity: 1;
      color: variables.$vas-color-grayscale--400;
      font-family: variables.$vas-font-family--primary;
    }

    &__field:-moz-placeholder {
      // Mozilla Firefox 4 to 18
      opacity: 1;
      color: variables.$vas-color-grayscale--400;
      font-family: variables.$vas-font-family--primary;
    }

    &__field::placeholder {
      // Most modern browsers support this now
      opacity: 1;
      color: variables.$vas-color-grayscale--400;
      font-family: variables.$vas-font-family--primary;
    }

    &__fixed-label {
      font-size: variables.$vas-font-size--14;
      position: absolute;
      top: 50%;
      left: variables.$vas-spacing--5;
      display: flex;
      transform: translateY(-50%);
      color: variables.$vas-color-grayscale--400;
    }

    &__slot-wrapper {
      position: absolute;
      top: 50%;
      right: variables.$vas-spacing--5;
      display: flex;
      transform: translateY(-50%);
      pointer-events: none;
    }

    &__slot {
      font-size: variables.$vas-font-size--14;
      display: flex;
      color: variables.$vas-color-grayscale--400;
    }

    // active
    &:not(&--border-0) &__field:active,
    &--active:not(&--border-0) &__field {
      border: 1px solid variables.$vas-color-grayscale--400;
    }

    // focus
    &__field:focus,
    &--focus &__field {
      outline: none;
    }

    &:not(&--border-0) &__field:focus,
    &--focus:not(&--border-0) &__field {
      border: 1px solid variables.$vas-color-grayscale--400;
    }

    // hover
    &:not(&--border-0) &__field:hover,
    &--hover:not(&--border-0) &__field {
      border: 1px solid variables.$vas-color-grayscale--400;
    }

    // disabled
    &__field:disabled,
    &:not(&--border-0) &__field:disabled,
    &--disabled &__field,
    &--disabled:not(&--border-0) &__field,
    &--disabled &__field:hover,
    &--disabled:not(&--border-0) &__field:hover {
      border-color: variables.$vas-color-grayscale--600;
      background-color: variables.$vas-color-grayscale--1000;
      color: variables.$vas-color-grayscale--400;

      &::placeholder {
        color: variables.$vas-color-grayscale--400;
      }
    }

    &--disabled {
      #{$this}__slot {
        color: variables.$vas-color-grayscale--300;
      }
    }

    &--type-hidden {
      display: none;
    }
  }
</style>
