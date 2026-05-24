<template>
  <Transition
    name="c-vas-modal--fade-animation"
    @after-enter="onAfterEnter"
  >
    <dialog
      v-if="isOpen"
      ref="scrollContainer"
      :class="b(modifiers)"
      @click="onOutsideClick"
    >
      <div
        :class="b('inner')"
        @click.stop
      >
        <div
          v-if="($slots.head || title || isClosable) && !hideHeader"
          :class="b('header')"
        >
          <slot
            name="head"
            :close="close"
          >
            <div
              v-if="title"
              :class="b('title')"
            >
              {{ title }}
            </div>
            <button
              v-if="isClosable"
              aria-label="close modal"
              :class="b('button-close')"
              type="button"
              @click="close"
            >
              <e-vas-icon
                icon="i-close"
                size="14"
              />
            </button>
          </slot>
        </div>
        <div :class="b('content')">
          <slot></slot>
        </div>
        <div
          v-if="$slots.footer"
          :class="b('footer')"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </dialog>
  </Transition>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import type { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  export const MODAL_SIZES: string[] = ['default'];
  export type ModalSizeType = (typeof MODAL_SIZES)[number];

  export const MODAL_SPACINGS: string[] = ['default', 'none'];
  export type ModalSpacingType = (typeof MODAL_SPACINGS)[number];

  /**
   * Renders a modal dialog.
   *
   * Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog.
   */
  export default defineComponent({
    name: 'c-vas-modal',

    components: {
      eVasIcon,
    },

    props: {
      /**
       * Toggles the visibility of the modal.
       */
      isOpen: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows defining a title.
       */
      title: {
        type: String,
        default: null,
      },

      /**
       * Allows defining whether the modal is closable.
       */
      isClosable: {
        type: Boolean,
        default: true,
      },

      /**
       * Allows hiding the header.
       */
      hideHeader: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows enabling/disabling close on outside click.
       */
      closeOnOutsideClick: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows modifying the size of the modal.
       */
      size: {
        type: String as PropType<ModalSizeType>,
        default: 'default',
        validator: (value: string) => MODAL_SIZES.includes(value),
      },

      /**
       * Allows modifying the inner spacing of the modal.
       */
      spacing: {
        type: String as PropType<ModalSpacingType>,
        default: 'default',
        validator: (value: string) => MODAL_SPACINGS.includes(value),
      },
    },
    emits: {
      'update:isOpen': (state: unknown): boolean => typeof state === 'boolean',
      'open': (): boolean => true,
      'close': (): boolean => true,
    },

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      modifiers(): Modifiers {
        return {
          size: this.size,
          spacing: this.spacing,
        };
      },
    },
    watch: {
      isOpen(state: boolean): void {
        if (state) {
          this.open();
        } else {
          this.close();
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      if (this.isOpen) {
        this.open();
      }
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
    },
    // unmounted() {},

    methods: {
      open(): void {
        // Attach before the nextTick so the listener is always registered even when
        // the Transition is disabled (e.g., in test environments).
        document.removeEventListener('keydown', this.onKeyDown); // prevent duplicate
        document.addEventListener('keydown', this.onKeyDown);

        this.$nextTick(() => {
          (this.$el as HTMLDialogElement | null)?.showModal?.();
          this.$emit('update:isOpen', true);
        });
      },

      close(): void {
        if (this.isOpen) {
          this.$emit('update:isOpen', false);
        }

        document.removeEventListener('keydown', this.onKeyDown);

        this.$emit('close');
      },

      onKeyDown(event: KeyboardEvent): void {
        if (this.isOpen && event.code === 'Escape') {
          this.close();
        }
      },

      onOutsideClick(): void {
        if (this.closeOnOutsideClick && this.isOpen) {
          this.close();
        }
      },

      onAfterEnter(): void {
        this.$emit('open');
        // Listener is already managed by open() / close() / beforeUnmount().
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  .c-vas-modal {
    $this: &;

    max-width: 100vw;
    padding: 0;
    overflow-x: hidden;
    background: none;
    color: var(--vas-theme-text-color);
    border: 1px solid var(--vas-theme-border-color);
    border-radius: 6px;

    @include mixins.media($down: sm) {
      height: 100vh;
      max-height: none;
    }

    &::backdrop {
      opacity: 0.4;
      background-color: variables.$vas-color-grayscale--0;
    }

    &--size-default &__inner {
      @include mixins.media(md) {
        width: 600px;
      }
    }

    &--spacing-default {
      #{$this}__header,
      #{$this}__footer,
      #{$this}__content {
        padding: variables.$vas-spacing--20;
      }
    }

    &--spacing-none {
      #{$this}__header,
      #{$this}__footer,
      #{$this}__content {
        padding: 0;
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      overflow-y: auto;
      background-color: var(--vas-theme-background-content);
      justify-self: center;

      @include mixins.media(md) {
        display: block;
        align-self: center;
        max-width: 75vw;
        height: auto;
        overflow-y: hidden;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      gap: variables.$vas-spacing--20;
      border-bottom: 1px solid var(--vas-theme-border-color);
    }

    &__title {
      font-size: variables.$vas-font-size--heading;
      line-height: 22px;
      font-weight: bold;
    }

    &__button-close {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 22px;
    }

    &__content {
      flex: 1 0 auto;
      max-height: 65vh;
      overflow-y: auto;
    }

    &__footer {
      border-top: 1px solid var(--vas-theme-border-color);
    }
  }

  .c-vas-modal--fade-animation-enter-active,
  .c-vas-modal--fade-animation-leave-active {
    &,
    &::backdrop {
      transition: opacity variables.$vas-transition-duration--default ease-in-out;
    }
  }

  .c-vas-modal--fade-animation-enter-from,
  .c-vas-modal--fade-animation-leave-to {
    &,
    &::backdrop {
      opacity: 0;
    }
  }
</style>
