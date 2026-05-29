<template>
  <span
    :class="b(componentModifiers)"
    role="status"
    aria-live="polite"
  >
    <span :class="b('inner')">
      <span :class="b('bubble')"></span>
      <span :class="b('bubble')"></span>
      <span :class="b('bubble')"></span>
    </span>
    <span v-if="showLoadingMessage">
      {{ loadingMessage }}
    </span>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'e-vas-progress',

    // components: {},

    props: {
      /**
       * Inverts the loading style
       */
      negative: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines a fallback message. "e-progress.loading" is used by default
       */
      message: {
        type: String,
        default: null, // Translation can not be set here because it will not be computed
      },

      /**
       * Define if the loading message should be shown.
       */
      showLoadingMessage: {
        type: Boolean,
        default: false,
      },
    },
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      loadingMessage(): string {
        return this.message || 'loading';
      },

      componentModifiers(): Modifiers {
        return {
          negative: this.negative,
        };
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
  @use 'sass:math';
  @use '../setup/scss/variables';

  @keyframes e-progress-rotation-animation {
    0% {
      transform: translate(-50% * -6, 0) scale(0) rotate(0.02deg); // NOTE: the rotation smooths animation in FF.
    }

    50% {
      transform: translate(-50%, 0) scale(1) rotate(0.02deg);
    }

    100% {
      transform: translate(-50% * 8, 0) scale(0) rotate(0.02deg);
    }
  }

  .e-vas-progress {
    $e-vas-progress--animation-duration: 2000ms;

    display: flex;
    align-items: center;
    padding: 5px;
    font-size: var(--vas-font-size-base);

    &--spacing-0 {
      padding: 0;
    }

    &__inner {
      position: relative;
      display: block;
      float: left;
      width: 4em;
    }

    &__bubble {
      position: absolute;
      top: -0.3em;
      left: 50%;
      display: block;
      width: 0.6em;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--vas-theme-text-color);
      animation: e-progress-rotation-animation #{$e-vas-progress--animation-duration} linear infinite;

      &:nth-child(1) {
        animation-delay: math.div($e-vas-progress--animation-duration, 3) * -1;
      }

      &:nth-child(2) {
        animation-delay: math.div($e-vas-progress--animation-duration, 3) * -2;
      }

      &:nth-child(3) {
        animation-delay: math.div($e-vas-progress--animation-duration, 3) * -3;
      }
    }
  }

  .e-vas-progress--negative {
    .e-vas-progress__bubble {
      background-color: variables.$vas-color-grayscale--1000;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .e-vas-progress__bubble {
      animation: none;
    }
  }
</style>
