import { reactive } from 'vue';
import { StyleguideConfiguration } from '../types/settings';
import { setInitialData } from './helper';

// Internal state, hidden from the outside
const config = reactive<StyleguideConfiguration>({
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
    config: config as Readonly<StyleguideConfiguration>,

    initialize(settings: Partial<StyleguideConfiguration>) {
      setInitialData(config, settings);
    },
  };
};

export type VasSettingsStore = ReturnType<typeof useVasSettingsStore>;
