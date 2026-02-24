<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Default Input </template>
        <template #demo>
          <e-vas-input
            v-model="value"
            name="text-input"
            :placeholder="placeholder"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :error="state.error"
            :valid="state.valid"
          />
        </template>
        <template #sidebar>
          <e-vas-input
            v-model="placeholder"
            name="placeholder"
            title="Placeholder"
          >
            Placeholder
          </e-vas-input>

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
  import eVasInput from '@/elements/e-vas-input.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Data = {
    value: string;
    placeholder: string;
    state: {
      [key: string]: boolean;
      disabled: boolean;
      readonly: boolean;
      error: boolean;
      valid: boolean;
    };
  };

  export default defineComponent({
    name: 'r-vas-input',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      eVasInput,
      lVasLayout,
    },

    data(): Data {
      return {
        value: '',
        placeholder: 'Type something...',
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
