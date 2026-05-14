import { reactive } from 'vue';
import { getPersistentItem, setPersistentItem } from './helper';

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

const state = reactive({
  theme: getPersistentItem<Theme>('theme', 'light'),
});

export const useVasSettingsStore = () => {
  return {
    state,

    setTheme(theme: Theme) {
      state.theme = theme;
      setPersistentItem('theme', theme);
    },
  };
};

export type VasSettingsStore = ReturnType<typeof useVasSettingsStore>;
