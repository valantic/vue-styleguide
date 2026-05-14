<template>
  <l-vas-layout
    :class="b()"
    padding="0"
    variant="plain"
    :show-headline="false"
  >
    <div :class="b('panels')">
      <div
        :class="b('panel')"
        class="vas-styleguide-reset"
      >
        <div :class="b('panel-header')">
          <span :class="b('badge', { light: true })">Light</span>
        </div>
        <c-vas-elements-preview />
      </div>

      <div
        :class="b('panel')"
        class="vas-styleguide-reset vas-theme--dark"
      >
        <div :class="b('panel-header')">
          <span :class="b('badge', { dark: true })">Dark</span>
        </div>
        <c-vas-elements-preview />
      </div>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';
  import cVasElementsPreview from './c-vas-elements-preview.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-theme-preview',

    components: {
      lVasLayout,
      cVasElementsPreview,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    // data(): Data {
    //   return {};
    // },

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

  .r-theme-preview {
    height: 100%;

    &__panels {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100%;
      gap: 1px;
      background-color: variables.$vas-color-grayscale--600;
    }

    &__panel {
      overflow-y: auto;
      padding: variables.$vas-spacing--20;
      background-color: var(--vas-theme-background-content);
      color: var(--vas-theme-text-color);
    }

    &__panel-header {
      display: flex;
      align-items: center;
      margin-bottom: variables.$vas-spacing--16;
      padding-bottom: variables.$vas-spacing--12;
      border-bottom: 1px solid var(--vas-theme-border-color);
    }

    &__badge {
      display: inline-flex;
      align-items: center;
      padding: variables.$vas-spacing--2 variables.$vas-spacing--10;
      border-radius: variables.$vas-theme-border-radius;
      font-size: variables.$vas-font-size--12;
      font-weight: variables.$vas-font-weight--semi-bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &--light {
        background-color: variables.$vas-color-grayscale--800;
        color: variables.$vas-color-grayscale--0;
        border: 1px solid variables.$vas-color-grayscale--600;
      }

      &--dark {
        background-color: variables.$vas-color-grayscale--100;
        color: variables.$vas-color-grayscale--900;
        border: 1px solid variables.$vas-color-grayscale--300;
      }
    }
  }
</style>
