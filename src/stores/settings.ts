import { reactive } from 'vue';
import { GenericSelectOption, StyleguideSettings } from '@/types/settings';

export type VasSettingsStoreState = {
  settings: StyleguideSettings;
};

const storeDefaults: StyleguideSettings = {
  availableThemes: [],
  availableLanguages: [],
  isLoggedIn: false,
  activeTheme: '',
  activeLanguage: '',
};

// Internal state, hidden from the outside
const state = reactive<VasSettingsStoreState>({
  settings: {
    ...storeDefaults,
  },
});

/**
 * A simple, encapsulated reactive store for internal styleguide communication.
 */
export const useVasSettingsStore = () => {
  return {
    // Read-only state to prevent accidental direct mutation
    state: state as Readonly<VasSettingsStoreState>,

    initialize(settings: Partial<StyleguideSettings>) {
      state.settings = {
        ...storeDefaults,
        ...settings,
      };

      state.settings.activeTheme = getSelectedValueByGenericOptions(state.settings.availableThemes);
      state.settings.activeLanguage = getSelectedValueByGenericOptions(state.settings.availableLanguages);
    },
  };
};

export type VasSettingsStore = ReturnType<typeof useVasSettingsStore>;

function getSelectedValueByGenericOptions(options: GenericSelectOption[]): string {
  return options.find((item) => item.selected)?.value ?? options[0]?.value ?? '';
}
