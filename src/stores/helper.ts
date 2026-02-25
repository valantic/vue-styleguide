export type State = {
  [key: string]: unknown;
};

export type InitialData = {
  [key: string]: unknown;
};

export const setInitialData = (state: State, initialData: InitialData) => {
  Object.keys(initialData).forEach((key: string) => {
    if (key in initialData && key in state) {
      state[key] = initialData[key];
    }
  });
};
