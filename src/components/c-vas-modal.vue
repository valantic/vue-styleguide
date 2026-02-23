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
          <div :class="b('header-inner')">
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
                  size="16"
                />
              </button>
            </slot>
          </div>
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
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

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
        type: String,
        default: 'default',
        validator: (value: string) => ['default'].includes(value),
      },

      /**
       * Allows modifying the inner spacing of the modal.
       */
      spacing: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'none'].includes(value),
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
      /**
       * Returns modifier classes.
       */
      modifiers(): Modifiers {
        return {
          size: this.size,
          spacing: this.spacing,
        };
      },
    },
    watch: {
      /**
       * Triggers opening/closing modal.
       */
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
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Opens the modal.
       */
      open(): void {
        this.$nextTick(() => {
          this.$el.showModal(); // Native function of `HTMLDialogElement`
          this.$emit('update:isOpen', true);
        });
      },

      /**
       * Closes the modal.
       */
      close(): void {
        if (this.isOpen) {
          this.$emit('update:isOpen', false);
        }

        document.removeEventListener('keydown', this.onKeyDown);

        this.$emit('close');
      },

      /**
       * Handler for keypress events.
       */
      onKeyDown(event: KeyboardEvent): void {
        if (this.isOpen && event.code === 'Escape') {
          this.close();
        }
      },

      /**
       * Handler for outside click event.
       */
      onOutsideClick(): void {
        if (this.closeOnOutsideClick && this.isOpen) {
          this.close();
        }
      },

      /**
       * Handler for when the modal open-animation is completed.
       */
      onAfterEnter(): void {
        this.$emit('open');
        document.addEventListener('keydown', this.onKeyDown);
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
    border: none;
    background: none;

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

    &__inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      overflow-y: auto;
      background-color: variables.$vas-color-grayscale--1000;
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
      padding: variables.$vas-spacing--20;
      border-bottom: 1px variables.$vas-color-grayscale--600;

      @include mixins.media(md) {
        padding: variables.$vas-spacing--26 variables.$vas-spacing--30;
      }
    }

    &__header {
      border-bottom: 1px solid variables.$vas-color-grayscale--600;
    }

    &__header-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__content {
      flex: 1 0 auto;
      padding: variables.$vas-spacing--26;
      max-height: 65vh;
      overflow-y: auto;
    }

    &__title {
      margin: 0;
      font-size: variables.$vas-font-size--18;
      font-weight: bold;
    }

    &__button-close {
      padding-left: variables.$vas-spacing--20;
      cursor: pointer;
    }

    &__footer {
      border-top: 1px solid variables.$vas-color-grayscale--600;
    }
  }

  .c-vas-modal--fade-animation-enter-active,
  .c-vas-modal--fade-animation-leave-active {
    &,
    &::backdrop {
      transition: opacity 150ms ease-in-out;
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
