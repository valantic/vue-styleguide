<template>
  <l-vas-layout :class="b()">
    <div :class="b('comparison')">
      <!-- Pull-tab -->
      <div :class="b('variant')">
        <p :class="b('caption')">Pull-tab handle</p>

        <div
          :class="b('viewport')"
          class="vas-styleguide-theme-dark"
        >
          <div :class="b('content')">
            <span :class="b('content-label')">Content area</span>
            <span
              v-if="pullTabOpen"
              :class="b('hint')"
              >Click anywhere to close</span
            >
          </div>

          <c-vas-flyout-handle
            :class="b('handle')"
            variant="pull-tab"
            :is-open="pullTabOpen"
            @toggle="pullTabOpen = !pullTabOpen"
          />

          <div
            :class="b('panel', { open: pullTabOpen })"
            @click.stop
          >
            <div :class="b('panel-header')">
              <span>Panel</span>
              <button
                :class="b('panel-close')"
                type="button"
                @click="pullTabOpen = false"
              >
                <e-vas-icon
                  icon="i-close"
                  size="12"
                />
              </button>
            </div>
            <div :class="b('panel-body')">Navigation / Settings go here.</div>
          </div>
        </div>

        <ul :class="b('desc')">
          <li>Almost invisible at rest — appears on hover</li>
          <li>Disappears when panel opens; close from within</li>
          <li>Maximum focus on content</li>
        </ul>
      </div>

      <!-- Icon button -->
      <div :class="b('variant')">
        <p :class="b('caption')">Single icon button</p>

        <div
          :class="b('viewport')"
          class="vas-styleguide-theme-dark"
        >
          <div :class="b('content')">
            <span :class="b('content-label')">Content area</span>
          </div>

          <c-vas-flyout-handle
            :class="b('handle')"
            variant="icon"
            icon="i-cog-wheel"
            :is-open="iconOpen"
            @toggle="iconOpen = !iconOpen"
          />

          <div
            :class="b('panel', { open: iconOpen })"
            @click.stop
          >
            <div :class="b('panel-header')">
              <span>Panel</span>
            </div>
            <div :class="b('panel-body')">Navigation / Settings go here.</div>
          </div>
        </div>

        <ul :class="b('desc')">
          <li>Always visible — no discoverability issue</li>
          <li>Accent border signals the active state (VS Code style)</li>
          <li>Click again to close</li>
        </ul>
      </div>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasFlyoutHandle from '../../../components/c-vas-flyout-handle.vue';
  import eVasIcon from '../../../elements/e-vas-icon.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    pullTabOpen: boolean;
    iconOpen: boolean;
  };

  /**
   * Demo page for c-vas-flyout-handle — compares pull-tab and icon button variants.
   */
  export default defineComponent({
    name: 'r-vas-flyout-handle',
    components: {
      cVasFlyoutHandle,
      eVasIcon,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        pullTabOpen: false,
        iconOpen: false,
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

  .r-vas-flyout-handle {
    $panel-width: 160px;

    &__comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: variables.$vas-spacing--30;
      align-items: start;
    }

    &__variant {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--12;
    }

    &__caption {
      font-weight: variables.$vas-font-weight--semi-bold;
      font-size: variables.$vas-font-size--16;
      margin: 0;
    }

    &__viewport {
      position: relative;
      height: 260px;
      border-radius: variables.$vas-theme-border-radius;
      overflow: hidden;
      display: flex;
      cursor: pointer;
    }

    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: variables.$vas-spacing--8;
      background-color: var(--vas-theme-background-content);
    }

    &__content-label {
      font-size: variables.$vas-font-size--12;
      color: var(--vas-theme-text-color-muted);
    }

    &__hint {
      font-size: variables.$vas-font-size--10;
      color: var(--vas-theme-text-color-muted);
      opacity: 0.6;
    }

    &__handle {
      flex-shrink: 0;
      align-self: center;
    }

    &__panel {
      position: absolute;
      top: 0;
      right: 0;
      width: $panel-width;
      height: 100%;
      background-color: var(--vas-theme-background-container);
      border-left: 1px solid var(--vas-theme-border-color);
      transform: translateX(100%);
      transition: transform variables.$vas-transition--default;
      display: flex;
      flex-direction: column;

      &--open {
        transform: translateX(0);
      }
    }

    &__panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      padding: 0 variables.$vas-spacing--10;
      border-bottom: 1px solid var(--vas-theme-border-color);
      font-size: variables.$vas-font-size--12;
      font-weight: variables.$vas-font-weight--semi-bold;
      flex-shrink: 0;
    }

    &__panel-close {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--vas-theme-text-color-muted);
      padding: variables.$vas-spacing--4;
      border-radius: 2px;

      &:hover {
        background-color: var(--vas-theme-background-surface-hover);
        color: var(--vas-theme-text-color);
      }
    }

    &__panel-body {
      padding: variables.$vas-spacing--12;
      font-size: variables.$vas-font-size--12;
      color: var(--vas-theme-text-color-muted);
    }

    &__desc {
      margin: 0;
      padding-left: variables.$vas-spacing--18;
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--4;
      font-size: variables.$vas-font-size--12;
      color: var(--vas-theme-text-color-muted);
    }
  }
</style>
