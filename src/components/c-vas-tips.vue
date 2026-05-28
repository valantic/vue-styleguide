<template>
  <div :class="b()">
    <transition
      :name="b('ticker')"
      mode="out-in"
    >
      <span
        :key="currentIndex"
        :class="b('text')"
        >{{ currentTip }}</span
      >
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { HOTKEYS, resolveHotkey } from '../config/hotkeys';
  import { isMac } from '../utils/platform';

  const TIPS = HOTKEYS.map((entry) => resolveHotkey(entry, isMac()).tip).filter(
    (tip): tip is string => tip !== null,
  );

  // type Setup = {};
  type Data = {
    currentIndex: number;
    timer: ReturnType<typeof setInterval> | null;
  };

  /**
   * Cycles through short tips about sidebar hotkeys and features.
   */
  export default defineComponent({
    name: 'c-vas-tips',

    // components: {},

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        currentIndex: Math.floor(Math.random() * TIPS.length),
        timer: null,
      };
    },

    computed: {
      currentTip(): string {
        return TIPS[this.currentIndex] ?? '';
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % TIPS.length;
      }, 8000);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-tips {
    overflow: hidden;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    padding-left: variables.$vas-spacing--8;

    &__text {
      display: block;
      white-space: nowrap;
      font-size: var(--vas-font-size-small);
      color: var(--vas-theme-text-color-muted);
    }

    &__ticker-enter-active,
    &__ticker-leave-active {
      transition:
        transform variables.$vas-transition--default,
        opacity variables.$vas-transition--default;
    }

    &__ticker-enter-from {
      transform: translateX(30%);
      opacity: 0;
    }

    &__ticker-leave-to {
      transform: translateX(-30%);
      opacity: 0;
    }
  }
</style>
