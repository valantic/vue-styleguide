<template>
  <div :class="b()">
    <section :class="b('section')">
      <span :class="b('label')">Typography</span>
      <strong :class="b('text-strong')">Heading text</strong>
      <p :class="b('text')">Regular body text to check readability across themes.</p>
      <p :class="b('text', { muted: true })">Muted / secondary text</p>
    </section>

    <section :class="b('section')">
      <span :class="b('label')">Button</span>
      <div :class="b('row')">
        <e-vas-button>Default</e-vas-button>
        <e-vas-button color="primary">Primary</e-vas-button>
        <e-vas-button variant="text">Text</e-vas-button>
        <e-vas-button disabled>Disabled</e-vas-button>
      </div>
    </section>

    <section :class="b('section')">
      <span :class="b('label')">Toggle</span>
      <div :class="b('column')">
        <e-vas-toggle v-model="toggleOn">Toggle on</e-vas-toggle>
        <e-vas-toggle :model-value="false">Toggle off</e-vas-toggle>
      </div>
    </section>

    <section :class="b('section')">
      <span :class="b('label')">Checkbox</span>
      <div :class="b('column')">
        <e-vas-checkbox
          v-model="checkboxChecked"
          name="preview-checked"
          >Checked</e-vas-checkbox
        >
        <e-vas-checkbox
          v-model="checkboxUnchecked"
          name="preview-unchecked"
          >Unchecked</e-vas-checkbox
        >
      </div>
    </section>

    <section :class="b('section')">
      <span :class="b('label')">Radio</span>
      <div :class="b('column')">
        <e-vas-radio
          v-model="radioValue"
          name="preview-radio"
          value="a"
          >Option A</e-vas-radio
        >
        <e-vas-radio
          v-model="radioValue"
          name="preview-radio"
          value="b"
          >Option B</e-vas-radio
        >
      </div>
    </section>

    <section :class="b('section')">
      <span :class="b('label')">Input</span>
      <e-vas-input
        v-model="inputValue"
        placeholder="Placeholder text…"
        name="preview-input"
      />
    </section>

    <section :class="b('section')">
      <span :class="b('label')">Select</span>
      <e-vas-select
        v-model="selectValue"
        :options="selectOptions"
      />
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasButton from '../../../elements/e-vas-button.vue';
  import eVasCheckbox from '../../../elements/e-vas-checkbox.vue';
  import eVasInput from '../../../elements/e-vas-input.vue';
  import eVasRadio from '../../../elements/e-vas-radio.vue';
  import eVasSelect from '../../../elements/e-vas-select.vue';
  import eVasToggle from '../../../elements/e-vas-toggle.vue';

  type Data = {
    toggleOn: boolean;
    checkboxChecked: boolean;
    checkboxUnchecked: boolean;
    radioValue: string;
    inputValue: string;
    selectValue: string;
    selectOptions: { value: string; label: string }[];
  };

  export default defineComponent({
    name: 'c-vas-elements-preview',

    components: {
      eVasButton,
      eVasCheckbox,
      eVasInput,
      eVasRadio,
      eVasSelect,
      eVasToggle,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        toggleOn: true,
        checkboxChecked: true,
        checkboxUnchecked: false,
        radioValue: 'a',
        inputValue: 'Sample input value',
        selectValue: 'b',
        selectOptions: [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ],
      };
    },

    // computed: {},
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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../../../setup/scss/variables';

  .c-vas-elements-preview {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--12;

    &__section {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--8;
      padding: variables.$vas-spacing--12;
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
    }

    &__label {
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--vas-theme-text-color-muted);
      padding-bottom: variables.$vas-spacing--6;
      border-bottom: 1px solid var(--vas-theme-border-color);
    }

    &__text-strong {
      font-size: variables.$vas-font-size--label;
      font-weight: variables.$vas-font-weight--bold;
    }

    &__text {
      font-size: variables.$vas-font-size--base;
      margin: 0;

      &--muted {
        color: var(--vas-theme-text-color-muted);
      }
    }

    &__row {
      display: flex;
      flex-wrap: wrap;
      gap: variables.$vas-spacing--8;
      align-items: center;
    }

    &__column {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--8;
    }
  }
</style>
