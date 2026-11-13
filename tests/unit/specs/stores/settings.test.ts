import { beforeEach, describe, expect, test } from 'vitest';
import { useVasSettingsStore } from '../../../../src/stores/settings';

describe('settings store: demoThemeMode', () => {
  beforeEach(() => {
    useVasSettingsStore().setDemoThemeMode(null);
  });

  test('is unset by default', () => {
    expect(useVasSettingsStore().state.demoThemeMode).toBeNull();
  });

  test('persists the mode and removes it again with null', () => {
    const store = useVasSettingsStore();

    store.setDemoThemeMode('compare');

    expect(store.state.demoThemeMode).toBe('compare');
    expect(localStorage.getItem('vas-demo-theme-mode')).toBe('"compare"');

    store.setDemoThemeMode(null);

    expect(store.state.demoThemeMode).toBeNull();
    expect(localStorage.getItem('vas-demo-theme-mode')).toBe('null');
  });
});
