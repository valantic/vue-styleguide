<template>
  <div :class="b()">
    <div :class="b('header')">
      <slot name="header"></slot>
    </div>
    <div :class="b('demo')">
      <slot name="demo"></slot>
    </div>
    <div :class="b('sidebar')">
      <div :class="b('sidebar-header')">Configuration</div>
      <slot name="sidebar"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * A demo frame for components.
   */
  export default defineComponent({
    name: 'c-vas-demo-card',

    // components: {},

    // props: {},
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-vas-demo-card {
    $content-padding: variables.$vas-spacing--16;

    border: 1px solid variables.$vas-theme-border-color;
    display: grid;
    grid-template-areas:
      'header'
      'sidebar'
      'demo';
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin: #{$content-padding * 2} 0;
    background-color: variables.$vas-theme-background-content;
    border-radius: variables.$vas-theme-border-radius;

    @include mixins.media(sm) {
      grid-template-areas:
        'header header'
        'demo sidebar';
      grid-template-columns: 65% 35%;
    }

    &__header {
      grid-area: header;
      display: flex;
      flex-wrap: wrap;
      background-color: variables.$vas-theme-background-surface;
      border-bottom: 1px solid variables.$vas-theme-border-color;
      color: variables.$vas-font-color--text;
      padding: $content-padding;
      gap: variables.$vas-spacing--10;
    }

    &__demo {
      grid-area: demo;
      padding: #{$content-padding * 3} $content-padding;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: variables.$vas-spacing--10;
    }

    &__sidebar {
      grid-area: sidebar;
      background-color: rgba(variables.$vas-theme-background-surface, 0.2);
      border-bottom: 1px solid variables.$vas-theme-border-color;
      padding: $content-padding;

      @include mixins.media(sm) {
        border-left: 1px solid variables.$vas-theme-border-color;
        border-bottom: 0;
      }
    }

    &__sidebar-header {
      font-size: variables.$vas-theme-text-size-small;
      color: variables.$vas-theme-text-color-muted;
      margin-bottom: variables.$vas-spacing--16;
    }
  }
</style>
