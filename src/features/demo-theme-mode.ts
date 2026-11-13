import type { InjectionKey } from 'vue';

/**
 * How `c-vas-demo-card` presents the themes:
 * - `toggle`: one pane on the light theme, a "Dark mode" toggle in the header switches it
 * - `compare`: a light and a dark pane side by side
 */
export type DemoThemeMode = 'toggle' | 'compare';

export const DEMO_THEME_MODES: readonly DemoThemeMode[] = ['toggle', 'compare'];

/**
 * Provide it on the app (or any ancestor) to set the default mode of all demo cards below:
 * `app.provide(vasDemoThemeModeKey, 'compare')`.
 */
export const vasDemoThemeModeKey: InjectionKey<DemoThemeMode> = Symbol('vas-demo-theme-mode');
