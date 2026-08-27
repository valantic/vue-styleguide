<template>
  <e-vas-field
    :class="b(modifiers)"
    :label="label"
    :field-id="fieldId"
    :state="state"
    :focused="focus"
    :disabled="isDisabled"
    active
  >
    <select
      :id="fieldId"
      :value="internalValue"
      :class="b('select')"
      :disabled="isDisabled"
      v-bind="$attrs"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
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
    <template #append>
      <span
        v-if="progress"
        :class="b('progress')"
      >
        <e-vas-progress />
      </span>
      <e-vas-icon
        v-else
        :class="b('icon')"
        icon="i-chevron--down"
        size="12"
      />
    </template>
  </e-vas-field>
</template>

<script lang="ts">
  import { PropType, defineComponent, toRefs } from 'vue';
  import { FormStates } from '../compositions/form-states';
  import useFormStates, { withProps } from '../compositions/form-states';
  import { Uuid } from '../compositions/uuid';
  import useUuid from '../compositions/uuid';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import { SelectOptionType } from '../types';
  import eVasField from './e-vas-field.vue';
  import eVasIcon from './e-vas-icon.vue';
  import eVasProgress from './e-vas-progress.vue';

  type Setup = FormStates & Uuid;

  type Data = {
    internalValue: string;
  };

  /**
   * Renders a styled select element. Options can be passed with the `options` property.
   */
  export default defineComponent({
    name: 'e-vas-select',

    components: {
      eVasField,
      eVasIcon,
      eVasProgress,
    },
    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      modelValue: {
        type: String,
        default: null,
      },

      /**
       * 'options' defines the options which are rendered in the select.
       *
       * e.g. `[{ <valueField>: 'id1', <labelField>: 'Label 1' },{ <valueField>: 'id2', <labelField>: 'Label 2' },...]`
       */
      options: {
        type: Array as PropType<SelectOptionType[]>,
        required: true,
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
       * Allows changing the default field, from which the value is taken for each option.
       */
      valueField: {
        type: String,
        default: 'value',
      },

      /**
       * Allows changing the default field, from which the label text is taken for each option.
       */
      labelField: {
        type: String,
        default: 'label',
      },
    },

    emits: {
      'update:modelValue': (value: string): boolean => typeof value === 'string',
    },

    setup(props): Setup {
      return {
        ...useFormStates(toRefs(props).state),
        ...useUuid(),
      };
    },

    data(): Data {
      return {
        internalValue: this.modelValue,
      };
    },

    computed: {
      modifiers(): Modifiers {
        return {
          ...this.stateModifiers,
        };
      },

      /**
       * Returns the `id` connecting the select with the label of the field.
       */
      fieldId(): string {
        return `e-vas-select--${this.uuid}`;
      },

      /**
       * Evaluates the disabled state, which is passed as a plain attribute, combined with the progress state.
       */
      isDisabled(): boolean {
        return this.progress || (this.$attrs.disabled !== undefined && this.$attrs.disabled !== false);
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
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      onChange(event: Event): void {
        const select = event.currentTarget as HTMLSelectElement;

        this.internalValue = select.value;
        this.$emit('update:modelValue', select.value);
      },

      onFocus(): void {
        this.focus = true;
      },

      onBlur(): void {
        this.focus = false;
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  .e-vas-select {
    &__select {
      cursor: pointer;

      &::-ms-expand {
        display: none;
      }

      &:disabled {
        cursor: default;
      }
    }

    &__progress {
      display: flex;
    }
  }
</style>
