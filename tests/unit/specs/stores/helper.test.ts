import { afterEach, describe, expect, test, vi } from 'vitest';
import { clearAllPersistentItems, getPersistentItem, setPersistentItem } from '../../../../src/stores/helper';

describe('helper — persistent storage', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('getPersistentItem', () => {
    test('returns stored value', () => {
      localStorage.setItem('vas-theme', JSON.stringify('dark'));
      expect(getPersistentItem('theme', 'light')).toBe('dark');
    });

    test('returns fallback when key is absent', () => {
      expect(getPersistentItem('missing', 'fallback')).toBe('fallback');
    });

    test('returns fallback when stored JSON is malformed', () => {
      localStorage.setItem('vas-theme', 'not-json{{{');
      expect(getPersistentItem('theme', 'light')).toBe('light');
    });

    test('returns fallback when localStorage.getItem throws (e.g. private browsing)', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new DOMException('SecurityError');
      });
      expect(getPersistentItem('theme', 'light')).toBe('light');
    });
  });

  describe('setPersistentItem', () => {
    test('persists a value', () => {
      setPersistentItem('theme', 'dark');
      expect(localStorage.getItem('vas-theme')).toBe('"dark"');
    });

    test('does not throw when localStorage.setItem throws (quota exceeded)', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError');
      });
      expect(() => setPersistentItem('theme', 'dark')).not.toThrow();
    });
  });

  describe('clearAllPersistentItems', () => {
    test('removes only keys with the vas- prefix', () => {
      localStorage.setItem('vas-theme', '"dark"');
      localStorage.setItem('other-key', 'keep-me');
      clearAllPersistentItems();
      expect(localStorage.getItem('vas-theme')).toBeNull();
      expect(localStorage.getItem('other-key')).toBe('keep-me');
    });

    test('does not throw when localStorage access throws', () => {
      vi.spyOn(Storage.prototype, 'key').mockImplementation(() => {
        throw new DOMException('SecurityError');
      });

      Object.defineProperty(localStorage, 'length', { value: 1, configurable: true });

      expect(() => clearAllPersistentItems()).not.toThrow();

      Object.defineProperty(localStorage, 'length', { value: 0, configurable: true });
    });
  });
});
