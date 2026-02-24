<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Default Radio </template>
        <template #demo>
          <e-vas-radio
            v-for="opt in options"
            v-model="value"
            :key="opt.value"
            :name="opt.name"
            :value="opt.value"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :error="state.error"
            :valid="state.valid"
          >
            {{ opt.label }}
          </e-vas-radio>
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
        </template>
      </c-vas-demo-card>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '@/components/c-vas-demo-card.vue';
  import eVasCheckbox from '@/elements/e-vas-checkbox.vue';
  import eVasRadio from '@/elements/e-vas-radio.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Option = { label: string; value: string | number; name: string };
  type Data = {
    value: string | number;
    options: Option[];
    state: {
      [key: string]: boolean;
      disabled: boolean;
      readonly: boolean;
      error: boolean;
      valid: boolean;
    };
  };

  export default defineComponent({
    name: 'r-vas-radio',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      eVasRadio,
      lVasLayout,
    },

    data(): Data {
      return {
        value: 'yes',
        options: [
          { label: 'Yes', value: 'yes', name: 'example' },
          { label: 'No', value: 'no', name: 'example' },
        ],
        state: {
          disabled: false,
          readonly: false,
          error: false,
          valid: false,
        },
      };
    },
  });
</script>
