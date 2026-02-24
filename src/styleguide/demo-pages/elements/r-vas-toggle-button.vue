<template>
  <l-vas-layout>
    <div :class="b()">
      <section :class="b('section')">
        <h2>Default</h2>
        <e-vas-toggle-button
          :active="isActive"
          @click="isActive = !isActive"
        >
          Toggle Me
        </e-vas-toggle-button>
        <p>State: {{ isActive ? 'Active' : 'Inactive' }}</p>
      </section>

      <section :class="b('section')">
        <h2>Active by default</h2>
        <e-vas-toggle-button active> Always Active (stateless in this demo) </e-vas-toggle-button>
      </section>

      <section :class="b('section')">
        <h2>Controlled state</h2>
        <div :class="b('group')">
          <e-vas-toggle-button
            :active="activeTab === 'left'"
            @click="activeTab = 'left'"
          >
            Left
          </e-vas-toggle-button>
          <e-vas-toggle-button
            :active="activeTab === 'right'"
            @click="activeTab = 'right'"
          >
            Right
          </e-vas-toggle-button>
        </div>
        <p>Selected: {{ activeTab }}</p>
      </section>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasToggleButton from '@/elements/e-vas-toggle-button.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Data = {
    isActive: boolean;
    activeTab: 'left' | 'right';
  };

  /**
   * Styleguide page for e-vas-toggle-button.
   */
  export default defineComponent({
    name: 'r-vas-toggle-button',

    components: {
      eVasToggleButton,
      lVasLayout,
    },

    data(): Data {
      return {
        isActive: false,
        activeTab: 'left',
      };
    },
  });
</script>

<style lang="scss">
  .r-vas-toggle-button {
    &__section {
      margin-top: 2rem;
    }

    &__group {
      display: flex;
      gap: 1rem;
    }
  }
</style>
