<template>
  <transition :name="b('fade')">
    <div
      v-if="visible"
      :class="b()"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { VasSettingsStore, useVasSettingsStore } from '../stores/settings';

  type Setup = {
    vasSettingsStore: VasSettingsStore;
  };

  type Data = {
    visible: boolean;
    message: string;
    hideTimeout: ReturnType<typeof setTimeout> | null;
  };

  const VISIBLE_DURATION_MS = 2500;

  /**
   * Brief top-right toast confirming that x-ray mode was toggled on or off, however it was
   * toggled (hotkey or the Features panel switch) — both just flip the same store value.
   */
  export default defineComponent({
    name: 'c-vas-x-ray-toast',

    // components: {},

    // props: {},
    // emits: {},

    setup(): Setup {
      return {
        vasSettingsStore: useVasSettingsStore(),
      };
    },
    data(): Data {
      return {
        visible: false,
        message: '',
        hideTimeout: null,
      };
    },

    // computed: {},
    watch: {
      'vasSettingsStore.state.isXRayModeEnabled': function (enabled: boolean) {
        this.message = enabled ? 'X-ray mode enabled' : 'X-ray mode disabled';
        this.visible = true;

        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
        }

        this.hideTimeout = setTimeout(() => {
          this.visible = false;
        }, VISIBLE_DURATION_MS);
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
    },
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-x-ray-toast {
    position: fixed;
    top: variables.$vas-spacing--20;
    right: variables.$vas-spacing--20;
    z-index: 1000;
    padding: variables.$vas-spacing--8 variables.$vas-spacing--16;
    border-radius: variables.$vas-theme-border-radius;
    background-color: variables.$vas-color-valantic-primary;
    color: variables.$vas-color-white;
    font-family: variables.$vas-font-family--sidebar;
    font-size: var(--vas-font-size-base);
    font-weight: variables.$vas-font-weight--semi-bold;
    box-shadow: 0 4px 12px variables.$vas-shadow-color--default;
    pointer-events: none;

    &__fade-enter-active,
    &__fade-leave-active {
      transition:
        opacity variables.$vas-transition--default,
        transform variables.$vas-transition--default;
    }

    &__fade-enter-from,
    &__fade-leave-to {
      transform: translateY(-8px);
      opacity: 0;
    }
  }
</style>
