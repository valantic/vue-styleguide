import { reactive, watch } from 'vue';
import { GenericSelectOption, StyleguideSettings } from '@/types/settings';

export type VasSettingsStoreState = {
  settings: StyleguideSettings;
  theme: string;
  language: string;
};

// Internal state, hidden from the outside
const state = reactive<VasSettingsStoreState>({
  settings: {
    availableThemes: [],
    availableLanguages: [],
  },
  theme: '',
  language: '',
});

/**
 * A simple, encapsulated reactive store for internal styleguide communication.
 */
export const useVasSettingsStore = () => {
  return {
    // Read-only state to prevent accidental direct mutation
    state: state as Readonly<VasSettingsStoreState>,

    initialize(settings: StyleguideSettings) {
      state.settings = settings;

      this.setTheme(getSelectedValueByGenericOptions(settings.availableThemes));
      this.setLanguage(getSelectedValueByGenericOptions(settings.availableLanguages));
    },

    // Actions to update state
    setTheme(newTheme: string) {
      state.theme = newTheme;
    },

    setLanguage(newLang: string) {
      state.language = newLang;
    },

    setSettings(newSettings: StyleguideSettings) {
      state.settings = newSettings;
    },

    watchChanges(callback: (key: keyof VasSettingsStoreState, value: string | StyleguideSettings) => void): void {
      watch(
        (): string => state.theme,
        (val: string): void => callback('theme', val),
      );
      watch(
        (): string => state.language,
        (val: string): void => callback('language', val),
      );
      watch(
        (): StyleguideSettings => state.settings,
        (val: StyleguideSettings): void => callback('settings', val),
      );
    },
  };
};

export type VasSettingsStore = ReturnType<typeof useVasSettingsStore>;

function getSelectedValueByGenericOptions(options: GenericSelectOption[]): string {
  return options.find((item) => item.selected)?.value ?? options[0]?.value ?? '';
}
