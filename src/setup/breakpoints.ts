/**
 * Breakpoint values in pixels. Single source of truth — the SCSS map in
 * _variables.scss must mirror these values exactly. A Vitest test at
 * tests/unit/specs/setup/breakpoints.test.ts enforces that they stay in sync.
 */
export const BREAKPOINTS = {
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
} as const;

export type ViewportBreakPoint = keyof typeof BREAKPOINTS;
