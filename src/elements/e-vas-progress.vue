<template>
  <span :class="b(componentModifiers)">
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
  import propScale from '../helpers/prop.scale';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

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
       * Sets the inner spacing for the animation
       *
       * Valid values: `[0, 500]`
       */
      spacing: propScale(500, [0, 500]),

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
    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      /**
       * Returns a readable loading message.
       */
      loadingMessage(): string {
        return this.message || 'loading';
      },

      /**
       * Returns all modifiers for the component main class.
       */
      componentModifiers(): Modifiers {
        return {
          negative: this.negative,
          spacing: this.spacing,
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
    font-size: 1rem;

    &--spacing-0 {
      padding: 0;
    }

    &__inner {
      position: relative;
      display: block;
      float: left;
      width: calc(1em * 4);
      height: 1.1em;
    }

    &__bubble {
      position: absolute;
      left: 50%;
      display: block;
      width: 0.6em;
      height: 0.6em;
      margin: variables.$vas-spacing--5 auto 0;
      border-radius: 50%;
      background-color: variables.$vas-color-grayscale--0;
      animation: e-progress-rotation-animation $e-vas-progress--animation-duration linear infinite;

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
</style>
