<template>
  <div :class="b()">
    <template v-if="current">
      <div
        :class="b('box', { unresolved: !current.hasComponent })"
        :style="boxStyle"
      ></div>
      <div
        :class="b('label', { unresolved: !current.hasComponent, copied })"
        :style="labelStyle"
      >
        <template v-if="copied">Copied!</template>
        <template v-else>
          <span :class="b('name')">{{ current.name }}</span>
          <span
            v-if="current.file"
            :class="b('path')"
          >{{ current.file }}</span>
          <span
            v-if="current.wraps"
            :class="b('wraps')"
          >wraps {{ current.wraps }}</span>
          <span
            v-if="depthHint"
            :class="b('depth')"
          >{{ depthHint }} · {{ navigateHint }}</span>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { formatCopyText, getComponentBreadcrumb } from '../utils/vue-component-inspector';
  import { isMac } from '../utils/platform';

  // type Setup = {};

  type DisplayEntry = {
    el: Element;
    name: string;
    file: string | null;
    wraps: string | null;
    hasComponent: boolean;
  };

  type Data = {
    breadcrumb: DisplayEntry[];
    selectedIndex: number;
    hoveredEl: Element | null;
    copied: boolean;
    copiedTimeout: ReturnType<typeof setTimeout> | null;
    frame: number | null;
  };

  const SIDEBAR_SELECTOR = '.c-vas-sidebar';
  const LABEL_INSET_PX = 6;
  const COPIED_FEEDBACK_MS = 1200;

  /**
   * Full-viewport hover inspector for x-ray mode: highlights the Vue component under the cursor,
   * lets you step through its component-only ancestor chain (Alt/Option+↑ parent / Alt/Option+↓
   * child) — skipping every plain DOM node in between — and copies the selected one's file path
   * (or name, if no file is resolvable) on click.
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
        breadcrumb: [],
        selectedIndex: 0,
        hoveredEl: null,
        copied: false,
        copiedTimeout: null,
        frame: null,
      };
    },

    computed: {
      current(): DisplayEntry | null {
        if (this.breadcrumb.length > 0) {
          return this.breadcrumb[this.selectedIndex] ?? this.breadcrumb[0] ?? null;
        }

        if (!this.hoveredEl) {
          return null;
        }

        return { el: this.hoveredEl, name: `<${this.hoveredEl.tagName.toLowerCase()}>`, file: null, wraps: null, hasComponent: false };
      },

      depthHint(): string | null {
        return this.breadcrumb.length > 1 ? `${this.selectedIndex + 1}/${this.breadcrumb.length}` : null;
      },

      navigateHint(): string {
        return isMac() ? '⌥+↑/↓' : 'Alt+↑/↓';
      },

      copyText(): string {
        return this.current ? formatCopyText(this.current) : '';
      },

      boxStyle(): Record<string, string> {
        if (!this.current) {
          return {};
        }

        const rect = this.current.el.getBoundingClientRect();

        return {
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        };
      },

      // Anchored to the box's own inner top-left corner rather than floating above it — a label
      // placed above the box goes off-screen (invisible) whenever the highlighted element sits at
      // or near the very top of the viewport.
      labelStyle(): Record<string, string> {
        if (!this.current) {
          return {};
        }

        const rect = this.current.el.getBoundingClientRect();

        return {
          top: `${rect.top + LABEL_INSET_PX}px`,
          left: `${rect.left + LABEL_INSET_PX}px`,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('click', this.handleClick, { capture: true });
      document.addEventListener('keydown', this.handleKeyDown);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('click', this.handleClick, { capture: true });
      document.removeEventListener('keydown', this.handleKeyDown);

      if (this.frame !== null) {
        cancelAnimationFrame(this.frame);
      }

      if (this.copiedTimeout) {
        clearTimeout(this.copiedTimeout);
      }
    },
    // unmounted() {},

    methods: {
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
          this.breadcrumb = [];
          this.hoveredEl = null;

          return;
        }

        // Same leaf DOM node as last time — keep the current selection (which may have been
        // navigated away from the nearest match via Alt+↑/↓) instead of resetting it every frame.
        if (el === this.hoveredEl) {
          return;
        }

        this.hoveredEl = el;
        this.breadcrumb = getComponentBreadcrumb(el).map((resolved) => ({ ...resolved, hasComponent: true }));
        this.selectedIndex = 0;
      },

      handleKeyDown(event: KeyboardEvent): void {
        if (!event.altKey || this.breadcrumb.length < 2) {
          return;
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          this.selectedIndex = Math.min(this.selectedIndex + 1, this.breadcrumb.length - 1);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        }
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

    &__path,
    &__wraps,
    &__depth {
      font-weight: normal;
      opacity: 0.85;
    }
  }
</style>
