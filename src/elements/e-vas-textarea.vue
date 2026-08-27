<template>
  <e-vas-field
    :class="b(modifiers)"
    :label="label"
    :field-id="fieldId"
    :state="state"
    :active="isActive"
    :focused="focus"
    :disabled="isDisabled"
  >
    <textarea
      v-model="internalValue"
      :id="fieldId"
      ref="textarea"
      :class="b('field')"
      :name="name"
      :title="title"
      :placeholder="visiblePlaceholder"
      :rows="rows"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
    ></textarea>
  </e-vas-field>
</template>

<script lang="ts">
  import { Ref, defineComponent, ref, toRefs } from 'vue';
  import { FormStates } from '../compositions/form-states';
  import useFormStates, { withProps } from '../compositions/form-states';
  import { Uuid } from '../compositions/uuid';
  import useUuid from '../compositions/uuid';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';
  import eVasField from './e-vas-field.vue';

  type Setup = FormStates &
    Uuid & {
      textarea: Ref<HTMLTextAreaElement | null>;
    };

  type Data = {
    internalValue: string;
  };

  /**
   * Renders a multiline text field. It shares the label behaviour and the styling of
   * `e-vas-input` and only differs in the control it wraps.
   */
  export default defineComponent({
    name: 'e-vas-textarea',

    components: {
      eVasField,
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
       * Adds name attribute
       */
      name: {
        type: String,
        required: true,
      },

      /**
       *  Adds title attribute
       */
      title: {
        type: String,
        default: null,
      },

      /**
       * Adds a placeholder. While a label is set, the placeholder only appears once the
       * label has floated out of the field.
       */
      placeholder: {
        type: String,
        default: null,
      },

      /**
       * Defines the amount of visible text lines.
       */
      rows: {
        type: [String, Number],
        default: 5,
      },

      /**
       * Grows the field with its content instead of scrolling it.
       */
      autoGrow: {
        type: Boolean,
        default: false,
      },

      /**
       * Prevents the user from resizing the field.
       */
      noResize: {
        type: Boolean,
        default: false,
      },
    },

    emits: {
      'update:modelValue': (payload: string) => typeof payload === 'string',
      'focus': () => true,
      'blur': () => true,
    },

    setup(props): Setup {
      const textarea = ref();

      return {
        ...useFormStates(toRefs(props).state),
        ...useUuid(),
        textarea,
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

          // Kebab-case, because the BEM plugin runs without `hyphenate`.
          'auto-grow': this.autoGrow,
          'no-resize': this.noResize || this.autoGrow,
        };
      },

      /**
       * Returns the `id` connecting the textarea with the label of the field.
       */
      fieldId(): string {
        return `e-vas-textarea--${this.uuid}`;
      },

      /**
       * Evaluates if the label has to float out of the field.
       */
      isActive(): boolean {
        return this.focus || !!this.internalValue || !this.label;
      },

      /**
       * Evaluates the disabled state, which is passed as a plain attribute.
       */
      isDisabled(): boolean {
        return this.$attrs.disabled !== undefined && this.$attrs.disabled !== false;
      },

      /**
       * Keeps the placeholder hidden while the label still sits inside the field.
       */
      visiblePlaceholder(): string | undefined {
        return !this.label || this.isActive ? (this.placeholder ?? undefined) : undefined;
      },
    },
    watch: {
      /**
       * Updates internal value if model value got changed from parent.
       */
      modelValue(value: string) {
        if (value !== this.internalValue) {
          this.internalValue = value;
          this.$nextTick(this.resize);
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.resize();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      onInput(event: Event): void {
        const target = event.target as HTMLTextAreaElement;

        this.internalValue = target.value;
        this.$emit('update:modelValue', target.value);
        this.resize();
      },

      onFocus(): void {
        this.focus = true;
        this.$emit('focus');
      },

      onBlur(): void {
        this.focus = false;
        this.$emit('blur');
      },

      /**
       * Matches the height of the field with the height of its content.
       */
      resize(): void {
        if (!this.autoGrow || !this.textarea) {
          return;
        }

        this.textarea.style.height = 'auto';
        this.textarea.style.height = `${this.textarea.scrollHeight}px`;
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  .e-vas-textarea {
    $this: &;

    &__field {
      // Textareas should only resize vertically so they don't break their container.
      resize: vertical;

      &::placeholder {
        opacity: 1;
        color: var(--vas-theme-text-color-muted);
        font-family: inherit;
      }
    }

    &--no-resize {
      #{$this}__field {
        resize: none;
      }
    }

    &--auto-grow {
      #{$this}__field {
        overflow: hidden;
      }
    }
  }
</style>
