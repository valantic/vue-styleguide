<template>
  <span
    ref="container"
    :class="b(modifiers)"
  >
    <e-vas-field
      :label="label"
      :label-id="labelId"
      :state="state"
      :active="isActive"
      :focused="isOpen"
      :disabled="isDisabled"
    >
      <!-- Search field -->
      <input
        v-if="isOpen && hasSearch"
        v-model="searchTerm"
        ref="searchField"
        :class="b('search-field')"
        :aria-labelledby="label ? labelId : undefined"
        type="text"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      />

      <!-- Trigger Button -->
      <button
        v-else
        ref="fieldWrapper"
        :class="b('field-wrapper', { open: isOpen, disabled: isDisabled })"
        :disabled="isDisabled"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-labelledby="label ? labelId : undefined"
        type="button"
        @click="isOpen = !isOpen"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      >
        <span :class="b('output-value')">
          {{ outputValue }}
        </span>
      </button>

      <template #append>
        <e-vas-progress v-if="progress" />
        <e-vas-icon
          v-else
          :class="b('arrow-icon')"
          icon="i-chevron--down"
          size="12"
        />
      </template>
    </e-vas-field>

    <!-- Content -->
    <transition name="top-slide">
      <span
        v-show="isOpen"
        :class="b('options-wrapper')"
      >
        <ul :class="b('options-list')">
          <li
            v-for="option in filteredOptions"
            :key="option[valueField]"
            :class="b('options-item')"
          >
            <e-vas-checkbox
              v-model="internalValue"
              :value="option[valueField]"
              :name="`e-multiselect--${uuid}`"
            >
              {{ option[labelField] }}
            </e-vas-checkbox>
          </li>
        </ul>
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
  import { PropType, Ref, defineComponent, ref, toRefs } from 'vue';
  import { FormStates } from '../compositions/form-states';
  import useFormStates, { withProps } from '../compositions/form-states';
  import { Uuid } from '../compositions/uuid';
  import useUuid from '../compositions/uuid';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import { SelectOptionType } from '../types';
  import eVasCheckbox from './e-vas-checkbox.vue';
  import eVasField from './e-vas-field.vue';
  import eVasIcon from './e-vas-icon.vue';
  import eVasProgress from './e-vas-progress.vue';

  type Setup = FormStates &
    Uuid & {
      container: Ref<HTMLDivElement | null | undefined>;
      searchField: Ref<HTMLInputElement | null | undefined>;
      fieldWrapper: Ref<HTMLButtonElement | null | undefined>;
    };

  type Data = {
    isOpen: boolean;
    searchTerm: string;
  };

  /**
   * This renders a multi-select component.
   */
  export default defineComponent({
    name: 'e-vas-multiselect',

    components: {
      eVasCheckbox,
      eVasField,
      eVasIcon,
      eVasProgress,
    },

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      modelValue: {
        type: Array as PropType<string[]>,
        default: () => [],
      },

      /**
       * Defines the available options to select.
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
        default: 'placeholder',
        validator: (value: string | boolean) => typeof value === 'string' || !value,
      },

      /**
       * Defines if the component should have a search field.
       */
      hasSearch: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines if the component should be in disabled mode.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Shows a progress loader in the component.
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
      'update:modelValue': (value: unknown) => value !== undefined,
      'close': (value: unknown) => value !== undefined,
    },

    setup(props): Setup {
      return {
        ...useFormStates(toRefs(props).state),
        ...useUuid(),
        container: ref(),
        searchField: ref(),
        fieldWrapper: ref(),
      };
    },

    data(): Data {
      return {
        isOpen: false,
        searchTerm: '',
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       *
       * @returns  {object}   BEM classes
       */
      modifiers(): Modifiers {
        return {
          ...this.stateModifiers,
        };
      },

      /**
       * Returns the `id` of the label, referenced by the control via `aria-labelledby`.
       * A `for` attribute is not an option here, since the control is a `button`.
       */
      labelId(): string {
        return `e-vas-multiselect--${this.uuid}`;
      },

      /**
       * V-model handler for the checkboxes (options).
       */
      internalValue: {
        get(): string[] {
          return this.modelValue;
        },
        set(value: string[]) {
          /**
           * Emits checkbox value e.g. true/false or value
           */
          this.$emit('update:modelValue', value);
        },
      },

      /**
       * Gets the current output value which is either the selected options or a placeholder text if available.
       */
      outputValue(): string {
        return this.selectionAsString || (typeof this.placeholder === 'string' ? this.placeholder : '');
      },

      /**
       * Gets a combined string of all the currently selected labels.
       *
       * @returns {string}
       */
      selectionAsString(): string {
        if (this.internalValue.length) {
          return this.options
            .filter((option) => {
              const value = option[this.valueField];

              return value !== undefined && this.internalValue.includes(value);
            })
            .map((option) => option[this.labelField])
            .join(', ');
        }

        return '';
      },

      /**
       * Evaluates if the label has to float out of the field, which is the case as soon as
       * the control shows any text of its own.
       */
      isActive(): boolean {
        return this.isOpen || !!this.outputValue || !this.label;
      },

      /**
       * Shows if the disabled state of the component should be active.
       */
      isDisabled(): boolean {
        return this.disabled || this.progress;
      },

      /**
       * Gets the filtered options if the user used the search.
       */
      filteredOptions(): SelectOptionType[] {
        if (this.hasSearch && this.searchTerm) {
          return this.options.filter((option) => option[this.labelField]?.includes(this.searchTerm));
        }

        return this.options;
      },
    },
    watch: {
      /**
       * Observes the "isOpen" property and sets the focus on the search field if it's available.
       */
      isOpen(open: boolean): void {
        if (this.hasSearch && open) {
          this.$nextTick(() => {
            this.searchField?.focus();
          });
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      document.addEventListener('click', this.onDocumentClick, { capture: true });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    unmounted() {
      document.removeEventListener('click', this.onDocumentClick, { capture: true });
    },

    methods: {
      onDocumentClick(event: MouseEvent): void {
        if (this.isOpen && !this.$el.contains(event.target)) {
          this.close();
        }
      },

      close(): void {
        if (this.disabled) {
          return;
        }

        this.isOpen = false;
        this.searchTerm = '';
        this.$emit('close', this.internalValue);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:math';
  @use '../setup/scss/variables';

  .e-vas-multiselect {
    $this: &;

    position: relative;
    display: block;

    &__field-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      text-align: left;
    }

    &__field-wrapper--disabled {
      cursor: default;
    }

    &__field-wrapper--open {
      #{$this}__arrow-icon {
        transform: rotate(180deg);
      }
    }

    &__output-value {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__arrow-icon {
      display: flex;
      transition: transform variables.$vas-transition-duration--default;
    }

    &__options-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 2;
      display: block;
      width: 100%;
      max-height: 300px;
      padding-top: variables.$vas-form-field-padding;
      overflow: auto;
      border: 1px solid var(--vas-theme-border-color);
      border-top: 0;
      background-color: var(--vas-theme-background-elevated);
      box-shadow: 0 2px 6px variables.$vas-shadow-color--soft;
      transform-origin: top;
    }

    &__options-list {
      overflow: hidden; // needed to fix weird dropdown height issue
    }

    &__options-item {
      padding: math.div(variables.$vas-form-field-padding, 2) variables.$vas-form-field-padding;
    }

    &__search-field {
      color: var(--vas-theme-text-color);
    }
  }
</style>
