<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Progress </template>
        <template #demo>
          <e-vas-progress
            :negative="state.negative"
            :show-loading-message="state.showMessage"
            :message="message"
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

          <e-vas-input
            v-model="message"
            name="message"
            placeholder="Custom loading message"
          >
            Message
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
  import eVasProgress from '@/elements/e-vas-progress.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Data = {
    state: {
      [key: string]: boolean;
      negative: boolean;
      showMessage: boolean;
    };
    message: string;
  };

  export default defineComponent({
    name: 'r-vas-progress',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      eVasInput,
      eVasProgress,
      lVasLayout,
    },

    data(): Data {
      return {
        state: {
          negative: false,
          showMessage: false,
        },
        message: '',
      };
    },
  });
</script>
