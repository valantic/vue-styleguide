import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useVasLocalStore } from '../../../../src/stores/local-store';

describe('useVasLocalStore — persistent storage', () => {
  let store: ReturnType<typeof useVasLocalStore>;

  beforeEach(() => {
    store = useVasLocalStore();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('get', () => {
    test('returns stored value', () => {
      localStorage.setItem('vas-theme', JSON.stringify('dark'));
      expect(store.get('theme', 'light')).toBe('dark');
    });

    test('returns fallback when key is absent', () => {
      expect(store.get('missing', 'fallback')).toBe('fallback');
    });

    test('returns fallback when stored JSON is malformed', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('vas-theme', 'not-json{{{');
      expect(store.get('theme', 'light')).toBe('light');
    });

    test('returns fallback when localStorage.getItem throws (e.g. private browsing)', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new DOMException('SecurityError');
      });
      expect(store.get('theme', 'light')).toBe('light');
    });
  });

  describe('set', () => {
    test('persists a value', () => {
      store.set('theme', 'dark');
      expect(localStorage.getItem('vas-theme')).toBe('"dark"');
    });

    test('does not throw when localStorage.setItem throws (quota exceeded)', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError');
      });
      expect(() => store.set('theme', 'dark')).not.toThrow();
    });
  });

  describe('patch', () => {
    test('updates specific properties of an object', () => {
      localStorage.setItem('vas-test', JSON.stringify({ a: 1, b: 2 }));
      store.patch<{ a: number; b: number }>('test', { b: 3 });
      expect(JSON.parse(localStorage.getItem('vas-test')!)).toEqual({ a: 1, b: 3 });
    });

    test('creates a new object if key does not exist', () => {
      store.patch<{ a: number }>('test', { a: 1 });
      expect(JSON.parse(localStorage.getItem('vas-test')!)).toEqual({ a: 1 });
    });

    test('overwrites non-object existing data', () => {
      localStorage.setItem('vas-test', '"string"');
      store.patch<{ a: number }>('test', { a: 1 });
      expect(JSON.parse(localStorage.getItem('vas-test')!)).toEqual({ a: 1 });
    });

    test('overwrites an existing array instead of merging into it', () => {
      localStorage.setItem('vas-test', JSON.stringify([1, 2, 3]));
      store.patch<{ a: number }>('test', { a: 1 });
      expect(JSON.parse(localStorage.getItem('vas-test')!)).toEqual({ a: 1 });
    });

    test('does not throw when patching fails', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('fail');
      });
      expect(() => store.patch('test', { a: 1 })).not.toThrow();
    });
  });

  describe('delete', () => {
    test('removes a single key with the vas- prefix', () => {
      localStorage.setItem('vas-theme', '"dark"');
      localStorage.setItem('vas-other', '"value"');
      store.delete('theme');
      expect(localStorage.getItem('vas-theme')).toBeNull();
      expect(localStorage.getItem('vas-other')).toBe('"value"');
    });

    test('does not throw when localStorage.removeItem throws', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new DOMException('SecurityError');
      });
      expect(() => store.delete('theme')).not.toThrow();
    });
  });

  describe('empty', () => {
    test('removes only keys with the vas- prefix', () => {
      localStorage.setItem('vas-theme', '"dark"');
      localStorage.setItem('other-key', 'keep-me');
      store.empty();
      expect(localStorage.getItem('vas-theme')).toBeNull();
      expect(localStorage.getItem('other-key')).toBe('keep-me');
    });

    test('does not throw when localStorage access throws', () => {
      vi.spyOn(Storage.prototype, 'key').mockImplementation(() => {
        throw new DOMException('SecurityError');
      });

      Object.defineProperty(localStorage, 'length', { value: 1, configurable: true });

      expect(() => store.empty()).not.toThrow();

      Object.defineProperty(localStorage, 'length', { value: 0, configurable: true });
    });
  });

  describe('analytics', () => {
    test('itemCount returns count of vas- prefixed items', () => {
      expect(store.analytics.itemCount).toBe(0);
      localStorage.setItem('vas-theme', '"dark"');
      localStorage.setItem('vas-other', '"value"');
      localStorage.setItem('unrelated', 'ignored');
      expect(store.analytics.itemCount).toBe(2);
    });

    test('storageSize returns total byte size of vas- prefixed items', () => {
      localStorage.setItem('vas-theme', '"dark"');

      const expectedSize = 'vas-theme'.length + '"dark"'.length;

      expect(store.analytics.storageSize).toBe(expectedSize);
    });

    test('itemCount returns 0 when localStorage throws', () => {
      vi.spyOn(Storage.prototype, 'key').mockImplementation(() => {
        throw new DOMException('SecurityError');
      });
      Object.defineProperty(localStorage, 'length', { value: 1, configurable: true });

      expect(store.analytics.itemCount).toBe(0);

      Object.defineProperty(localStorage, 'length', { value: 0, configurable: true });
    });

    test('storageSize returns 0 when localStorage throws', () => {
      vi.spyOn(Storage.prototype, 'key').mockImplementation(() => {
        throw new DOMException('SecurityError');
      });
      Object.defineProperty(localStorage, 'length', { value: 1, configurable: true });

      expect(store.analytics.storageSize).toBe(0);

      Object.defineProperty(localStorage, 'length', { value: 0, configurable: true });
    });
  });
});
