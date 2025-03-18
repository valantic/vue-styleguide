/**
 * @type {object} Lookup table of available breakpoints.
 *
 * Keep in sync with SCSS variables!
 */
export const BREAKPOINTS = {
  // Keep in sync with SCSS variables!
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
};

export type ViewportBreakPoint = keyof typeof BREAKPOINTS;
