export type ThemeConfig = {
  name: string;
  id: string;
  selected?: boolean;
};

export type StyleguideSettings = {
  themePath: string;
  availableThemes: ThemeConfig[];
};
