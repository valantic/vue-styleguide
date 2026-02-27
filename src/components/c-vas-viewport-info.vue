<template>
  <div :class="b('', { isOpen })">
    <e-vas-icon
      :class="b('icon')"
      :icon="viewportIcon"
      size="18"
    />
    <div :class="b('name')">
      {{ $viewport.currentViewport }}
    </div>
    <div :class="b('dimensions', { isOpen })">
      <div :class="b('dimension')">{{ $viewport.viewportWidth }}w</div>
      <div :class="b('dimension')">{{ $viewport.viewportHeight }}h</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import { Icon } from '../types/icon';

  // type Setup = {};
  // type Data = {};

  /**
   * Viewport info overlay.
   */
  export default defineComponent({
    name: 'c-vas-viewport-info',
    components: {
      eVasIcon,
    },

    props: {
      /**
       * Define open state.
       */
      isOpen: {
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

    computed: {
      viewportIcon(): Icon {
        if (this.$viewport.isTablet) {
          return 'i-viewport--tablet';
        } else if (this.$viewport.isDesktop) {
          return 'i-viewport--desktop';
        }

        return 'i-viewport--mobile';
      },
    },
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

  .c-vas-viewport-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'viewport-icon viewport-name'
      'viewport-dimension viewport-dimension';
    align-items: center;
    text-align: right;
    padding: variables.$vas-spacing--2 variables.$vas-spacing--10;
    background: variables.$vas-color-grayscale--500;
    pointer-events: none;
    transition:
      color variables.$vas-transition--default,
      background-color variables.$vas-transition--default;
    width: 65px;

    &--is-open {
      background-color: variables.$vas-color-grayscale--800;
    }

    &__icon {
      grid-area: viewport-icon;
      color: variables.$vas-color-grayscale--0;
      margin-right: variables.$vas-spacing--4;
    }

    &__name {
      grid-area: viewport-name;
      font-weight: bold;
    }

    &__dimensions {
      margin-top: variables.$vas-spacing--4;
      grid-area: viewport-dimension;
      height: 0;
      overflow: hidden;
      transition: height variables.$vas-transition--default;

      &--is-open {
        height: auto;
      }
    }

    &__dimension {
      font-size: variables.$vas-font-size--14;
    }
  }
</style>
