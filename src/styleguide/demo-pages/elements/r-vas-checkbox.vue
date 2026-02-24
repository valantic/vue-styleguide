<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Default Checkbox </template>
        <template #demo>
          <e-vas-checkbox
            v-for="opt in options"
            v-model="values"
            :key="opt.value"
            :name="opt.name"
            :value="opt.value"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :error="state.error"
            :valid="state.valid"
            :variant="state.toggle ? 'toggle' : 'default'"
          >
            {{ opt.label }}
          </e-vas-checkbox>
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
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Option = { label: string; value: string; name: string };
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
  };

  export default defineComponent({
    name: 'r-vas-checkbox',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      lVasLayout,
    },

    data(): Data {
      return {
        values: ['yes'],
        options: [
          { label: 'Yes', value: 'yes', name: 'yes' },
          { label: 'No', value: 'no', name: 'no' },
        ],
        state: {
          disabled: false,
          readonly: false,
          error: false,
          valid: false,
          toggle: false,
        },
      };
    },
  });
</script>
