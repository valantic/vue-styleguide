<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Toggle </template>
        <template #demo>
          <e-vas-toggle v-model="value">Notifications</e-vas-toggle>
        </template>
        <template #sidebar>
          <e-vas-checkbox
            v-model="value"
            name="value"
            >value</e-vas-checkbox
          >
        </template>
      </c-vas-demo-card>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '@/components/c-vas-demo-card.vue';
  import eVasCheckbox from '@/elements/e-vas-checkbox.vue';
  import eVasToggle from '@/elements/e-vas-toggle.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    value: boolean;
  };

  /**
   * Styleguide demo for e-vas-toggle
   */
  export default defineComponent({
    name: 'r-vas-toggle',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      eVasToggle,
      lVasLayout,
    },

    // setup(): Setup {},
    data(): Data {
      return {
        value: true,
      };
    },

    // computed: {},
    // watch: {},

    // methods: {},
  });
</script>
