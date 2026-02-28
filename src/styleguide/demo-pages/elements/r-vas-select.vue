<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Default Select </template>
        <template #demo>
          <e-vas-select
            v-model="selected"
            :class="b('select')"
            :options="options"
            :placeholder="placeholder"
            :has-selectable-placeholder="hasSelectablePlaceholder"
            :progress="progress"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :error="state.error"
            :valid="state.valid"
          />
        </template>
        <template #sidebar>
          <e-vas-checkbox
            v-for="key in Object.keys(state)"
            v-model="state[key]"
            :key="key"
            :name="key"
          >
            {{ key }}
          </e-vas-checkbox>

          <e-vas-checkbox
            v-model="progress"
            name="progress"
          >
            progress
          </e-vas-checkbox>
          <e-vas-checkbox
            v-model="hasSelectablePlaceholder"
            name="hasSelectablePlaceholder"
          >
            hasSelectablePlaceholder
          </e-vas-checkbox>

          <e-vas-input
            v-model="placeholder"
            name="placeholder"
            title="placeholder"
            placeholder="placeholder"
          />
        </template>
      </c-vas-demo-card>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '@/components/c-vas-demo-card.vue';
  import eVasCheckbox from '@/elements/e-vas-checkbox.vue';
  import eVasInput from '@/elements/e-vas-input.vue';
  import eVasSelect from '@/elements/e-vas-select.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Option = { label: string; value: string };
  type Data = {
    selected: string;
    options: Option[];
    state: {
      [key: string]: boolean;
      disabled: boolean;
      readonly: boolean;
      error: boolean;
      valid: boolean;
    };
    placeholder: string;
    hasSelectablePlaceholder: boolean;
    progress: boolean;
  };

  export default defineComponent({
    name: 'r-vas-select',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      eVasInput,
      eVasSelect,
      lVasLayout,
    },

    data(): Data {
      return {
        selected: '',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ],
        state: {
          disabled: false,
          readonly: false,
          error: false,
          valid: false,
        },
        placeholder: 'Choose an option',
        hasSelectablePlaceholder: false,
        progress: false,
      };
    },
  });
</script>

<style lang="scss">
  .r-vas-select {
    &__select {
      width: 300px;
    }
  }
</style>
