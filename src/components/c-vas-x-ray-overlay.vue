<template>
  <div :class="b()">
    <template v-if="target">
      <div
        :class="b('box', { unresolved: !hasComponent })"
        :style="boxStyle"
      ></div>
      <div
        :class="b('label', { unresolved: !hasComponent, copied })"
        :style="labelStyle"
      >
        <template v-if="copied">Copied!</template>
        <template v-else>
          <span :class="b('name')">{{ label }}</span>
          <span
            v-if="filePath"
            :class="b('path')"
          >{{ filePath }}</span>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { formatCopyText, resolveComponentAtElement } from '../utils/vue-component-inspector';

  // type Setup = {};

  type Data = {
    target: Element | null;
    hasComponent: boolean;
    label: string;
    filePath: string | null;
    copyText: string;
    copied: boolean;
    copiedTimeout: ReturnType<typeof setTimeout> | null;
    frame: number | null;
  };

  const SIDEBAR_SELECTOR = '.c-vas-sidebar';
  const LABEL_OFFSET_PX = 22;
  const COPIED_FEEDBACK_MS = 1200;

  /**
   * Full-viewport hover inspector for x-ray mode: highlights the Vue component under the
   * cursor and copies its name + file path to the clipboard on click.
   */
  export default defineComponent({
    name: 'c-vas-x-ray-overlay',

    // components: {},

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        target: null,
        hasComponent: false,
        label: '',
        filePath: null,
        copyText: '',
        copied: false,
        copiedTimeout: null,
        frame: null,
      };
    },

    computed: {
      boxStyle(): Record<string, string> {
        return this.rectStyle(0);
      },

      labelStyle(): Record<string, string> {
        return this.rectStyle(-LABEL_OFFSET_PX);
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('click', this.handleClick, { capture: true });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('click', this.handleClick, { capture: true });

      if (this.frame !== null) {
        cancelAnimationFrame(this.frame);
      }

      if (this.copiedTimeout) {
        clearTimeout(this.copiedTimeout);
      }
    },
    // unmounted() {},

    methods: {
      rectStyle(topOffset: number): Record<string, string> {
        if (!this.target) {
          return {};
        }

        const rect = this.target.getBoundingClientRect();

        return {
          top: `${rect.top + topOffset}px`,
          left: `${rect.left}px`,
          width: topOffset === 0 ? `${rect.width}px` : 'auto',
          height: topOffset === 0 ? `${rect.height}px` : 'auto',
        };
      },

      isSidebarChrome(el: Element | null): boolean {
        return Boolean(el?.closest(SIDEBAR_SELECTOR));
      },

      handleMouseMove(event: MouseEvent): void {
        if (this.frame !== null) {
          return;
        }

        this.frame = requestAnimationFrame(() => {
          this.frame = null;
          this.updateTarget(event.target as Element | null);
        });
      },

      updateTarget(el: Element | null): void {
        if (!el || this.isSidebarChrome(el)) {
          this.target = null;

          return;
        }

        const resolved = resolveComponentAtElement(el);

        if (resolved) {
          this.target = resolved.el;
          this.hasComponent = true;
          this.label = resolved.name;
          this.filePath = resolved.file;
          this.copyText = formatCopyText(resolved);

          return;
        }

        this.target = el;
        this.hasComponent = false;
        this.label = `<${el.tagName.toLowerCase()}>`;
        this.filePath = null;
        this.copyText = this.label;
      },

      handleClick(event: MouseEvent): void {
        const el = event.target as Element | null;

        if (this.isSidebarChrome(el)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (!this.copyText) {
          return;
        }

        navigator.clipboard
          ?.writeText(this.copyText)
          .then(() => {
            this.copied = true;

            if (this.copiedTimeout) {
              clearTimeout(this.copiedTimeout);
            }

            this.copiedTimeout = setTimeout(() => {
              this.copied = false;
            }, COPIED_FEEDBACK_MS);
          })
          .catch(() => {
            // Clipboard write can fail (permissions, insecure context) — the inspector keeps working regardless.
          });
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-x-ray-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    pointer-events: none;

    &__box {
      position: absolute;
      border: 2px solid variables.$vas-color-valantic-primary;
      border-radius: 2px;
      background-color: rgba(255, 93, 76, 8%);

      &--unresolved {
        border-color: variables.$vas-color-grayscale--400;
        background-color: transparent;
      }
    }

    &__label {
      position: absolute;
      display: flex;
      align-items: baseline;
      gap: variables.$vas-spacing--6;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--8;
      border-radius: variables.$vas-theme-border-radius;
      background-color: variables.$vas-color-valantic-primary;
      color: variables.$vas-color-white;
      font-family: variables.$vas-font-family--sidebar;
      font-size: var(--vas-font-size-small);
      font-weight: variables.$vas-font-weight--semi-bold;
      white-space: nowrap;

      &--unresolved {
        background-color: variables.$vas-color-grayscale--400;
      }

      &--copied {
        background-color: variables.$vas-color-green-primary;
      }
    }

    &__path {
      font-weight: normal;
      opacity: 0.85;
    }
  }
</style>
