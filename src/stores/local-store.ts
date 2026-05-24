const prefix = 'vas-';

const getPersistentItem = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`${prefix}${key}`);

    if (!item) {
      return fallback;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to get persistent item with key "${key}"`, error);

    return fallback;
  }
};

const setPersistentItem = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to set persistent item with key "${key}"`, error);
  }
};

const deletePersistentItem = (key: string): void => {
  try {
    localStorage.removeItem(`${prefix}${key}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to delete persistent item with key "${key}"`, error);
  }
};

const clearAllPersistentItems = (): void => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to clear persistent items', error);
  }
};

const getPersistentItemCount = (): number => {
  try {
    return Object.keys(localStorage).filter((key) => key.startsWith(prefix)).length;
  } catch {
    return 0;
  }
};

const getPersistentItemsSize = (): number => {
  try {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith(prefix))
      .reduce((total, key) => total + key.length + (localStorage.getItem(key)?.length ?? 0), 0);
  } catch {
    return 0;
  }
};

const localStore = {
  get: <T>(key: string, fallback: T): T => getPersistentItem(key, fallback),
  set: (key: string, value: unknown): void => setPersistentItem(key, value),
  delete: (key: string): void => deletePersistentItem(key),
  empty: (): void => clearAllPersistentItems(),
  analytics: {
    get itemCount() {
      return getPersistentItemCount();
    },
    get storageSize() {
      return getPersistentItemsSize();
    },
  },
};

export const useVasLocalStore = (): typeof localStore => localStore;
export type VasLocalStore = typeof localStore;
