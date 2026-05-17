<template>
  <div :class="b()">
    <e-vas-icon
      :class="b('icon')"
      :icon="viewportIcon"
      size="14"
    />
    <span :class="b('name')">{{ viewport.currentViewport }}</span>
    <span :class="b('dimensions')">{{ viewport.viewportWidth }}w · {{ viewport.viewportHeight }}h</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import type { Viewport } from '../plugins/viewport';
  import { addViewportResizeEvent, removeViewportResizeEvent, useViewport } from '../plugins/viewport';
  import type { Icon } from '../types/icon';

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
      eVasIcon,
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
      viewportIcon(): Icon {
        if (this.viewport.isTablet) {
          return 'i-viewport--tablet';
        } else if (this.viewport.isDesktop) {
          return 'i-viewport--desktop';
        }

        return 'i-viewport--mobile';
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
  @use '../setup/scss/variables';

  .c-vas-viewport-info {
    display: flex;
    align-items: center;
    gap: variables.$vas-spacing--4;
    pointer-events: none;
    font-size: variables.$vas-font-size--12;
    padding: 0 variables.$vas-spacing--6;

    &__icon {
      flex-shrink: 0;
      color: var(--vas-theme-text-color);
    }

    &__name {
      font-weight: variables.$vas-font-weight--semi-bold;
      text-transform: uppercase;
    }

    &__dimensions {
      color: var(--vas-theme-text-color-muted);
    }
  }
</style>
