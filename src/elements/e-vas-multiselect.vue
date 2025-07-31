<template>
  <span ref="container" :class="b(modifiers)">
    <!-- Search field -->
    <input
      v-if="isOpen && hasSearch"
      v-model="searchTerm"
      ref="searchField"
      :placeholder="$t('e-multiselect.searchFieldPlaceholder')"
      :class="b('search-field')"
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
      type="button"
      @click="isOpen = !isOpen"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <span :class="b('output-value')">
        {{ outputValue }}
      </span>
      <span :class="b('progress-wrapper')">
        <e-vas-progress v-if="progress" />
      </span>
    </button>

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
  import { defineComponent, PropType, Ref, ref, toRefs } from 'vue';
  import useFormStates, { FormStates, withProps } from '../compositions/form-states';
  import useUuid, { Uuid } from '../compositions/uuid';
  import eVasCheckbox from './e-vas-checkbox.vue';
  import eVasProgress from './e-vas-progress.vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  type Option = {
    value: string;
    label: string;
    [key: string]: string;
  };

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
      eVasProgress,
    },

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      modelValue: {
        default: () => [],
        type: Array as PropType<string[]>,
      },

      /**
       * Defines the available options to select.
       *
       * e.g. `[{ <valueField>: 'id1', <labelField>: 'Label 1' },{ <valueField>: 'id2', <labelField>: 'Label 2' },...]`
       */
      options: {
        required: true,
        type: Array as PropType<Option[]>,
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
        /**
         * @type {boolean} Holds the internal opening state of the options.
         */
        isOpen: false,

        /**
         * @type {string} Holds the value fo the search input field.
         */
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

              return typeof value !== 'undefined' && this.internalValue.includes(value);
            })
            .map((option) => option[this.labelField])
            .join(', ');
        }

        return '';
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
      filteredOptions(): Option[] {
        if (this.hasSearch && this.searchTerm) {
          return this.options.filter((option) => option[this.labelField]?.includes(this.searchTerm));
        }

        return this.options;
      },
    },
    watch: {
      /**
       * Observes the "isOpen" property and sets the focus on the search field if it's available.
       *
       * @param {boolean} open - The open state.
       */
      isOpen(open) {
        if (this.hasSearch && open) {
          this.$nextTick(() => {
            this.searchField?.focus();
          });
        }

        if (this.isOpen) {
          document.addEventListener('click', this.handleOutsideClick);
        } else {
          document.removeEventListener('click', this.handleOutsideClick);
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      window.addEventListener('click', this.onClick, { capture: true });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('click', this.handleOutsideClick);
    },
    // unmounted() {},

    methods: {
      /**
       * Checks if the dropdown needs to be closed because of an outside click
       */
      onClick(event: MouseEvent) {
        if (this.$el !== event.target && !this.$el.contains(event.target)) {
          this.close();
        }
      },

      /**
       * Close options event handler.
       */
      close() {
        if (this.disabled) {
          return;
        }

        this.isOpen = false;
        this.searchTerm = '';

        /**
         * Emits the closing event to the parent.
         *
         * @event close
         * @type {array.<string>}
         */
        this.$emit('close', this.internalValue);
      },

      /**
       * Hides the overlay if the user clicks somewhere else than inside the container.
       */
      handleOutsideClick(event: Event) {
        if (!this.container?.contains(event.target as Node)) {
          this.close();
        }
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
      width: 100%;
      padding: variables.$vas-form-field-padding;
      border: 1px solid variables.$vas-form-border-color;
      border-radius: variables.$vas-form-border-radius;
      background-color: variables.$vas-color-grayscale--1000;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }

    // hover
    &__field-wrapper:hover,
    &--hover &__field-wrapper {
      border-color: variables.$vas-form-border-color--hover;
    }

    &__field-wrapper--open {
      border-color: variables.$vas-color-grayscale--400;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;

      #{$this}__arrow-icon {
        transform: rotate(180deg);
      }

      + #{$this}__options-wrapper {
        border-color: variables.$vas-color-grayscale--400;
      }
    }

    &__field-wrapper--disabled {
      color: variables.$vas-color-grayscale--500;
      pointer-events: none;
    }

    &__output-value {
      flex: 1 0 calc(100% - 20px);
      max-width: calc(100% - 20px);
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__options-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      display: block;
      width: 100%;
      max-height: 300px;
      overflow: auto;
      border: 1px solid variables.$vas-form-border-color;
      border-top: 0;
      background-color: variables.$vas-color-grayscale--1000;
      transform-origin: top;
      padding-top: variables.$vas-form-field-padding;
    }

    &__options-list {
      overflow: hidden; // needed to fix weird dropdown height issue
    }

    &__options-item {
      padding: math.div(variables.$vas-form-field-padding, 2) variables.$vas-form-field-padding;
    }

    &__progress-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    &__search-field {
      width: 100%;
      padding: variables.$vas-form-field-padding;
      outline: none;
      border: 1px solid variables.$vas-form-border-color;
      border-top-left-radius: variables.$vas-form-border-radius;
      border-top-right-radius: variables.$vas-form-border-radius;
    }
  }
</style>
