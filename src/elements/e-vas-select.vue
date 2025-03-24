<template>
  <span :class="b(modifiers)">
    <select
      :value="internalValue"
      :class="b('select')"
      :disabled="progress"
      v-bind="$attrs"
      @change="onChange"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <option
        v-if="placeholder"
        :disabled="!hasSelectablePlaceholder"
        value=""
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="`${option[valueField]}`"
        :value="option[valueField]"
        :selected="option[valueField] === internalValue"
      >
        {{ option[labelField] }}
      </option>
    </select>
    <span :class="b('icon-wrapper')">
      <span
        v-if="progress"
        :class="b('progress-container')"
      >
        <e-vas-progress />
      </span>
    </span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRefs } from 'vue';
  import useFormStates, { FormStates, withProps } from '../compositions/form-states';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import eVasProgress from './e-vas-progress.vue';

  // type Setup = {};

  type Data = {
    internalValue: string;
  };

  export type Options = {
    [key: string]: string;
  };

  /**
   * Renders a styled select element. Options can be passed with the `options` property.
   */
  export default defineComponent({
    name: 'e-vas-select',

    components: {
      eVasProgress,
    },
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
       * 'options' defines the options which are rendered in the select.
       *
       * e.g. `[{ <valueField>: 'id1', <labelField>: 'Label 1' },{ <valueField>: 'id2', <labelField>: 'Label 2' },...]`
       */
      options: {
        required: true,
        type: Array as PropType<Options[]>,
      },

      /**
       * The text to display if no option is selected by default.
       * The placeholder can also be disabled by passing 'false' to this prop.
       */
      placeholder: {
        type: [String, Boolean],
        default: 'Choose an option',
        validator: (value: string | boolean) => typeof value === 'string' || !value,
      },

      /**
       * Defines if the placeholder text is selectable to reset the select (empty value).
       */
      hasSelectablePlaceholder: {
        type: Boolean,
        default: false,
      },

      /**
       * Shows a progress bar.
       */
      progress: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to change the default field, from which the value is taken for each option.
       */
      valueField: {
        type: String,
        default: 'value',
      },

      /**
       * Allows to change the default field, from which the label text is taken for each option.
       */
      labelField: {
        type: String,
        default: 'label',
      },
    },

    emits: {
      'update:modelValue': (value: string): boolean => typeof value === 'string',
    },

    setup(props): FormStates {
      return {
        ...useFormStates(toRefs(props).state),
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
        return {
          ...this.stateModifiers,
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
      /**
       * Emits input event for v-model.
       */
      onChange(event: Event) {
        const select = event.currentTarget as HTMLSelectElement;

        this.internalValue = select.value;

        /**
         * input event fires on input
         */
        this.$emit('update:modelValue', select.value);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .e-vas-select {
    $this: &;

    position: relative;
    display: block;

    &__select {
      width: 100%;
      padding: 8px;
      outline: none;
      border: 1px solid variables.$vas-color-grayscale--500;
      border-radius: 3px;
      cursor: pointer;
      appearance: none;
      background-image: url('../assets/chevron--down.svg');
      background-size: 10px;
      background-repeat: no-repeat;
      background-position: calc(100% - 8px) center;

      &::-ms-expand {
        display: none;
      }
    }

    // separator for state icons
    &__icon-wrapper {
      position: absolute;
      top: 50%;
      right: variables.$vas-spacing--5;
      transform: translateY(-50%);
    }

    // hover
    &__select:hover,
    &--hover &__select {
      border: 1px solid variables.$vas-color-grayscale--400;
    }

    // focus
    &__select:focus,
    &--focus &__select {
      outline: none;
    }

    // disabled
    &__select:disabled,
    &--disabled &__select,
    &--disabled &__select:hover {
      border-color: variables.$vas-color-grayscale--600;
      cursor: default;
      color: variables.$vas-color-grayscale--400;
    }

    &__progress-container {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }
  }
</style>
