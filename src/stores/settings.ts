import { reactive } from 'vue';
import { StyleguideConfiguration } from '../types/settings';
import { setInitialData } from './helper';

// Internal state, hidden from the outside
const state = reactive<StyleguideConfiguration>({
  options: {
    themes: [],
    languages: [],
  },
  settings: {
    isLoggedIn: false,
    activeTheme: '',
    activeLanguage: '',
  },
});

/**
 * A simple, encapsulated reactive store for internal styleguide communication.
 */
export const useVasSettingsStore = () => {
  return {
    // Read-only state to prevent accidental direct mutation
    state: state as Readonly<StyleguideConfiguration>,

    initialize(settings: Partial<StyleguideConfiguration>) {
      setInitialData(state, settings);
    },

    updateIsLoggedIn(isLoggedIn: boolean) {
      state.settings.isLoggedIn = isLoggedIn;
    },

    updateActiveTheme(theme: string) {
      state.settings.activeTheme = theme;
    },

    updateActiveLanguage(language: string) {
      state.settings.activeLanguage = language;
    },
  };
};

export type VasSettingsStore = ReturnType<typeof useVasSettingsStore>;
