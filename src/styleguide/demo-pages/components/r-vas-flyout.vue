<template>
  <l-vas-layout>
    <div :class="b()">
      <c-vas-demo-card>
        <template #header> Flyout Demo </template>
        <template #demo>
          <div :class="b('flyout-container')">
            <e-vas-button
              primary
              @click="isOpen = !isOpen"
            >
              Toggle Flyout
            </e-vas-button>
          </div>
        </template>
        <template #sidebar>
          <div :class="b('config-item')">
            <label>Direction</label>
            <e-vas-select
              v-model="direction"
              :options="directionOptions"
            />
          </div>
        </template>
      </c-vas-demo-card>
    </div>

    <c-vas-flyout
      :is-open="isOpen"
      :direction="direction"
    >
      <template #content>
        <div :class="b('flyout-content')">
          <h3>Flyout Content</h3>
          <p>This is the content of the flyout.</p>
          <e-vas-button @click="isOpen = false">Close</e-vas-button>
        </div>
      </template>
    </c-vas-flyout>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '../../../components/c-vas-demo-card.vue';
  import cVasFlyout from '../../../components/c-vas-flyout.vue';
  import eVasButton from '../../../elements/e-vas-button.vue';
  import eVasSelect from '../../../elements/e-vas-select.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';
  import type { SelectOptionType } from '../../../types';

  // type Setup = {};
  type Data = {
    isOpen: boolean;
    direction: 'left' | 'right';
    directionOptions: SelectOptionType[];
  };

  /**
   * Styleguide page for the Flyout component.
   */
  export default defineComponent({
    name: 'r-vas-flyout',

    components: {
      lVasLayout,
      cVasDemoCard,
      cVasFlyout,
      eVasButton,
      eVasSelect,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        isOpen: false,
        direction: 'left',
        directionOptions: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ],
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

<style lang="scss">
  @use '../../../setup/scss/variables';

  .r-vas-flyout {
    &__flyout-container {
      position: relative;
      width: 100%;
      height: 400px;
      overflow: hidden;
      border: 1px dashed variables.$vas-color-grayscale--600;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__flyout-content {
      padding: variables.$vas-spacing--20;
    }

    &__config-item {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--4;

      label {
        font-weight: bold;
        font-size: variables.$vas-theme-text-size-small;
      }
    }
  }
</style>
