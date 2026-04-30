<template>
  <e-vas-toggle-button
    :class="b('', { active })"
    :active="active"
    :is-animated="isAnimated"
  >
    <e-vas-icon
      :icon="icon"
      :size="iconSize"
    />
  </e-vas-toggle-button>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import eVasToggleButton from '../elements/e-vas-toggle-button.vue';
  import type { Icon } from '../types/icon';

  // type Setup = {};
  // type Data = {};

  /**
   * Toggle button for flyout.
   */
  export default defineComponent({
    name: 'c-vas-flyout-toggle-button',
    components: {
      eVasToggleButton,
      eVasIcon,
    },

    props: {
      /**
       * Toggles the active state.
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Icon name.
       */
      icon: {
        type: String as PropType<Icon>,
        default: '',
      },

      /**
       * Icon size.
       */
      iconSize: {
        type: String,
        default: '18',
      },

      /**
       * Toggles the animated state.
       */
      isAnimated: {
        type: Boolean,
        default: false,
      },
    },
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

  .c-vas-flyout-toggle-button {
    &.e-vas-toggle-button {
      border-radius: 0;
    }

    &:hover:not(&--active) {
      &.e-vas-toggle-button:hover {
        background-color: variables.$vas-color-grayscale--1000;
      }
    }
  }
</style>
