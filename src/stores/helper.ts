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

const prefix = 'vas-';

/**
 * Get item from persistent storage and parse it.
 */
export const getPersistentItem = <T>(key: string, fallback: T): T => {
  const item = localStorage.getItem(`${prefix}${key}`);

  if (!item) {
    return fallback;
  }

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to parse persistent item with key "${key}"`, error);

    return fallback;
  }
};

/**
 * Set item in persistent storage and stringify it.
 */
export const setPersistentItem = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to set persistent item with key "${key}"`, error);
  }
};

/**
 * Method to remove all persistent keys with prefix from styleguide.
 */
export const clearAllPersistentItems = (): void => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
};
