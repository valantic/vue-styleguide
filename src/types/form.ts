export type SelectOptionType = {
  value: string;
  label: string;
};

export type MultiSelectOptionType = SelectOptionType & {
  [key: string]: string;
};
