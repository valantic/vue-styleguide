import { reactive } from 'vue';
import type { Icon } from '../types/icon';
import { useVasLocalStore } from './local-store';

export const THEMES = ['system', 'light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];
export type ResolvedTheme = 'light' | 'dark';

export const THEME_CONFIG: Record<Theme, { label: string; icon: Icon }> = {
  system: { label: 'System', icon: 'i-computer' },
  light: { label: 'Light', icon: 'i-sun' },
  dark: { label: 'Dark', icon: 'i-moon' },
};

const vasLocalStore = useVasLocalStore();

export const FONT_SIZE_MIN = 10;
export const FONT_SIZE_MAX = 16;
export const FONT_SIZE_DEFAULT = 13;

const state = reactive({
  theme: vasLocalStore.get<Theme>('theme', 'system'),
  fontSize: vasLocalStore.get<number>('fontSize', FONT_SIZE_DEFAULT),
});

export const useVasSettingsStore = () => {
  return {
    state,

    setTheme(theme: Theme) {
      state.theme = theme;
      vasLocalStore.set('theme', theme);
    },

    setFontSize(size: number): void {
      const clamped = Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, size));

      state.fontSize = clamped;
      vasLocalStore.set('fontSize', clamped);
    },
  };
};

export type VasSettingsStore = ReturnType<typeof useVasSettingsStore>;
