export type GenericSelectOption = {
  label: string;
  value: string;
};

export type StyleguideConfigOptions = {
  themes: GenericSelectOption[];
  languages: GenericSelectOption[];
};

export type StyleguideConfigSettings = {
  isLoggedIn: boolean;
  activeTheme: string;
  activeLanguage: string;
};

export type StyleguideConfiguration = {
  options: StyleguideConfigOptions;
  settings: StyleguideConfigSettings;
};
