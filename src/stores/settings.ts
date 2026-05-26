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

const state = reactive({
  theme: vasLocalStore.get<Theme>('theme', 'system'),
});

export const useVasSettingsStore = () => {
  return {
    state,

    setTheme(theme: Theme) {
      state.theme = theme;
      vasLocalStore.set('theme', theme);
    },
  };
};

export type VasSettingsStore = ReturnType<typeof useVasSettingsStore>;
