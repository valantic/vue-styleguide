const prefix = 'vas-';

/**
 * Get item from persistent storage and parse it.
 */
export const getPersistentItem = <T>(key: string, fallback: T): T => {
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

/**
 * Returns the count of persisted items with the vas- prefix.
 */
export const getPersistentItemCount = (): number => {
  try {
    return Object.keys(localStorage).filter((key) => key.startsWith(prefix)).length;
  } catch {
    return 0;
  }
};

/**
 * Returns the total size in bytes of all persisted items with the vas- prefix.
 */
export const getPersistentItemsSize = (): number => {
  try {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith(prefix))
      .reduce((total, key) => total + key.length + (localStorage.getItem(key)?.length ?? 0), 0);
  } catch {
    return 0;
  }
};
