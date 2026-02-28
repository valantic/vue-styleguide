<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Multiselect </template>
        <template #demo>
          <e-vas-multiselect
            v-model="values"
            :class="b('multiselect')"
            :options="options"
            :placeholder="placeholder"
            :has-search="hasSearch"
            :disabled="state.disabled || disabled"
            :progress="progress"
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
            v-model="hasSearch"
            name="hasSearch"
          >
            hasSearch
          </e-vas-checkbox>

          <e-vas-checkbox
            v-model="disabled"
            name="disabled"
          >
            disabled (prop)
          </e-vas-checkbox>

          <e-vas-checkbox
            v-model="progress"
            name="progress"
          >
            progress
          </e-vas-checkbox>

          <e-vas-input
            v-model="placeholder"
            name="placeholder"
            title="placeholder"
            placeholder="Placeholder text"
          >
            Placeholder
          </e-vas-input>
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
  import eVasMultiselect from '@/elements/e-vas-multiselect.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Option = { label: string; value: string };
  type Data = {
    values: string[];
    options: Option[];
    state: {
      [key: string]: boolean;
      disabled: boolean;
      readonly: boolean;
      error: boolean;
      valid: boolean;
    };
    hasSearch: boolean;
    disabled: boolean;
    progress: boolean;
    placeholder: string;
  };

  /**
   * Multiselect demo page
   */
  export default defineComponent({
    name: 'r-vas-multiselect',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      eVasInput,
      eVasMultiselect,
      lVasLayout,
    },

    data(): Data {
      return {
        values: [],
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
        hasSearch: false,
        disabled: false,
        progress: false,
        placeholder: 'Choose options',
      };
    },
  });
</script>

<style lang="scss">
  .r-vas-multiselect {
    &__multiselect {
      width: 300px;
    }
  }
</style>
