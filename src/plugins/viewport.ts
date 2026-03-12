import { Plugin, reactive, ref } from 'vue';
import { BREAKPOINTS, ViewportBreakPoint } from '../setup/globals';

export type ViewportNames = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// --- Shared State ---
const viewportWidth = ref<number>(typeof window === 'undefined' ? 0 : window.innerWidth);
const viewportHeight = ref<number>(typeof window === 'undefined' ? 0 : window.innerHeight);

/**
 * Service for managing and accessing viewport information.
 */
export class Viewport {
  /**
   * The current width of the viewport.
   */
  public get viewportWidth(): number {
    return viewportWidth.value;
  }

  /**
   * The current height of the viewport.
   */
  public get viewportHeight(): number {
    return viewportHeight.value;
  }

  /**
   * Whether the current viewport is XXS.
   */
  public get isXxs(): boolean {
    return viewportWidth.value < BREAKPOINTS.xs;
  }

  /**
   * Whether the current viewport is XS or larger.
   */
  public get isXs(): boolean {
    return viewportWidth.value >= BREAKPOINTS.xs;
  }

  /**
   * Whether the current viewport is SM or larger.
   */
  public get isSm(): boolean {
    return viewportWidth.value >= BREAKPOINTS.sm;
  }

  /**
   * Whether the current viewport is MD or larger.
   */
  public get isMd(): boolean {
    return viewportWidth.value >= BREAKPOINTS.md;
  }

  /**
   * Whether the current viewport is LG or larger.
   */
  public get isLg(): boolean {
    return viewportWidth.value >= BREAKPOINTS.lg;
  }

  /**
   * Whether the current viewport is XL or larger.
   */
  public get isXl(): boolean {
    return viewportWidth.value >= BREAKPOINTS.xl;
  }

  /**
   * Whether the current viewport is mobile.
   */
  public get isMobile(): boolean {
    return !this.isSm;
  }

  /**
   * Whether the current viewport is desktop.
   */
  public get isDesktop(): boolean {
    return this.isMd;
  }

  /**
   * Whether the current viewport is tablet.
   */
  public get isTablet(): boolean {
    return this.isSm && !this.isMd;
  }

  /**
   * Whether the current viewport is smaller than desktop.
   */
  public get isSmallerThanDesktop(): boolean {
    return !this.isDesktop;
  }

  /**
   * Whether the current viewport is smaller than tablet.
   */
  public get isSmallerThanTablet(): boolean {
    return !this.isSm;
  }

  /**
   * Whether the current viewport is bigger than mobile.
   */
  public get isBiggerThanMobile(): boolean {
    return this.isSm;
  }

  /**
   * Whether the current viewport is bigger than tablet.
   */
  public get isBiggerThanTablet(): boolean {
    return this.isMd;
  }

  /**
   * The name of the current viewport breakpoint.
   */
  public get currentViewport(): ViewportNames {
    return (
      (Object.entries(BREAKPOINTS)
        .sort((a, b) => b[1] - a[1]) // eslint-disable-line unicorn/no-array-sort
        .find((breakpoint) => viewportWidth.value >= breakpoint[1])?.[0] as ViewportBreakPoint) || 'xxs'
    );
  }

  /**
   * Checks if the current viewport is greater than or equal to the specified breakpoint.
   */
  public greater(breakpoint: ViewportBreakPoint): boolean {
    return viewportWidth.value >= BREAKPOINTS[breakpoint];
  }

  /**
   * Checks if the current viewport is smaller than the specified breakpoint.
   */
  public smaller(breakpoint: ViewportBreakPoint): boolean {
    return viewportWidth.value < BREAKPOINTS[breakpoint];
  }

  /**
   * Checks if the current viewport is between the specified breakpoints.
   */
  public between(min: ViewportBreakPoint, max: ViewportBreakPoint): boolean {
    return this.greater(min) && this.smaller(max);
  }

  /**
   * Syncs the viewport dimensions with the current window size.
   */
  public sync() {
    if (typeof window !== 'undefined') {
      viewportWidth.value = window.innerWidth;
      viewportHeight.value = window.innerHeight;
    }
  }
}

const onResize = () => {
  viewportWidth.value = window.innerWidth;
  viewportHeight.value = window.innerHeight;
};

export function addViewportResizeEvent(): void {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
  }
}

export function removeViewportResizeEvent(): void {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', onResize);
  }
}

// Singleton instance
const viewport = new Viewport();

/**
 * Composable for accessing the shared viewport state.
 */
export function useViewport(): Viewport {
  return viewport;
}

/**
 * Adds a viewport instance to Vue itself, which can be used by calling this.$viewport.
 */
const plugin: Plugin = {
  install(app) {
    viewport.sync();
    app.config.globalProperties.$viewport = reactive(viewport);

    // Optional: Cleanup if the whole app unmounts
    const originalUnmount = app.unmount;

    addViewportResizeEvent();

    app.unmount = () => {
      removeViewportResizeEvent();
      originalUnmount();
    };
  },
};

export default plugin;

declare module 'vue' {
  interface ComponentCustomProperties {
    $viewport: Viewport;
  }
}
