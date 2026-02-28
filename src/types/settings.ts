import { SelectOptionType } from './form';

export type StyleguideConfigOptions = {
  themes: SelectOptionType[];
  languages: SelectOptionType[];
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
