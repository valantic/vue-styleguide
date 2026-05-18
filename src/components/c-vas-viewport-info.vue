<template>
  <c-vas-panel-action
    variant="fluid-column"
    :text="viewport.currentViewport"
    :tooltip="tooltip"
    tooltip-position="right"
    :class="b()"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { Viewport } from '../plugins/viewport';
  import { addViewportResizeEvent, removeViewportResizeEvent, useViewport } from '../plugins/viewport';
  import cVasPanelAction from './c-vas-panel-action.vue';

  type Setup = {
    viewport: Viewport;
  };
  // type Data = {};

  /**
   * Inline viewport info strip showing breakpoint name and dimensions.
   */
  export default defineComponent({
    name: 'c-vas-viewport-info',
    components: {
      cVasPanelAction,
    },

    // props: {},
    // emits: [],

    setup(): Setup {
      return {
        viewport: useViewport(),
      };
    },
    // data(): Data {
    //   return {};
    // },

    computed: {
      tooltip(): string {
        return `Viewport: ${this.viewport.viewportWidth}w / ${this.viewport.viewportHeight}h`;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      addViewportResizeEvent();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      removeViewportResizeEvent();
    },
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .c-vas-viewport-info {
    .c-vas-panel-action {
      padding: 2px 0;
      text-transform: uppercase !important; // stylelint-disable-line declaration-no-important
      font-size: 12px;
      font-weight: bold;
      line-height: 1;
      aspect-ratio: 1;
    }
  }
</style>
