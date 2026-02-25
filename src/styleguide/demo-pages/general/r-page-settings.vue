<template>
  <l-vas-layout>
    <template #pageConfig>
      <e-vas-button
        primary
        @click="count = count + 1"
      >
        Button
      </e-vas-button>
      <e-vas-toggle v-model="toggleValue"> Toggle me </e-vas-toggle>
    </template>

    <div :class="b()">
      <p>
        This page shows you how to add custom settings and data to the `page-settings sidebar`. Open it with the hotkey
        <span class="l-vas-layout__highlight"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>,</kbd></span>
      </p>

      <h4>Common use cases</h4>

      <ul class="l-vas-layout__list">
        <li>Change the mock data for layout pages.</li>
        <li>Test different versions of pages, eg a product detail page.</li>
        <li>Test loading scenarios.</li>
      </ul>

      <section :class="b('section')">
        <c-vas-demo-card>
          <template #header>Demo</template>
          <template #demo>
            <div>Button Click Count: {{ count }}</div>
            <div>Toggle state {{ toggleValue ? 'On' : 'Off' }}</div>
          </template>
          <template #sidebar></template>
        </c-vas-demo-card>
      </section>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '@/components/c-vas-demo-card.vue';
  import eVasButton from '@/elements/e-vas-button.vue';
  import eVasToggle from '@/elements/e-vas-toggle.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide page for c-vas-demo-card.
   */
  export default defineComponent({
    name: 'r-vas-page-settings',

    components: {
      eVasToggle,
      cVasDemoCard,
      eVasButton,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data() {
      return {
        count: 0,
        toggleValue: false,
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
