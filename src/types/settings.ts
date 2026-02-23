export type GenericSelectOption = {
  label: string;
  value: string;
  selected?: boolean;
};

export type StyleguideSettings = {
  availableThemes: GenericSelectOption[];
  availableLanguages: GenericSelectOption[];
  isLoggedIn: boolean;
  activeTheme: string;
  activeLanguage: string;
};
