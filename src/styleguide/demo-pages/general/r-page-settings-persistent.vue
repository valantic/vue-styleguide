<template>
  <l-vas-layout>
    <template #pageConfig>
      <e-vas-button
        primary
        @click="count++"
      >
        Button
      </e-vas-button>
      <e-vas-toggle v-model="toggleValue"> Toggle me </e-vas-toggle>
    </template>

    <div :class="b()">
      <p>
        This page shows you how to add custom settings and data to the `page-settings sidebar` and persist them. Open
        the sidebar with the hotkey
        <span class="l-vas-layout__highlight"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>,</kbd></span>
      </p>

      <h4>How it works</h4>

      <ul class="l-vas-layout__list">
        <li>The state is initialized from a persistent storage if available.</li>
        <li>A `watch` is used to save any changes back to the storage.</li>
        <li>Try changing the values and then refresh the page.</li>
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
  import { getPersistentItem, setPersistentItem } from '@/stores/helper';
  import cVasDemoCard from '@/components/c-vas-demo-card.vue';
  import eVasButton from '@/elements/e-vas-button.vue';
  import eVasToggle from '@/elements/e-vas-toggle.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  const STORAGE_KEY = 'vas-page-settings-persistent';

  /**
   * Styleguide page for persistent page settings.
   */
  export default defineComponent({
    name: 'r-vas-page-settings-persistent',

    components: {
      eVasToggle,
      cVasDemoCard,
      eVasButton,
      lVasLayout,
    },

    data() {
      const defaults = {
        count: 0,
        toggleValue: false,
      };

      return {
        ...defaults,
        ...getPersistentItem(STORAGE_KEY, {}),
      };
    },

    watch: {
      count() {
        this.saveSettings();
      },
      toggleValue() {
        this.saveSettings();
      },
    },

    methods: {
      saveSettings() {
        setPersistentItem(STORAGE_KEY, {
          count: this.count,
          toggleValue: this.toggleValue,
        });
      },
    },
  });
</script>
