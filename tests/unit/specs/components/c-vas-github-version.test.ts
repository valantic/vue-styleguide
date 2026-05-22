import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import packageJson from '../../../../package.json';
import cVasGithubVersion from '../../../../src/components/c-vas-github-version.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountComponent = () =>
  mount(cVasGithubVersion, {
    global: {
      plugins: [vueBemCn],
      stubs: { 'c-vas-panel-action': true },
    },
  });

describe('c-vas-github-version', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('version display', () => {
    test('passes current package version as text prop', () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 404 })));

      const wrapper = mountComponent();
      const action = wrapper.findComponent({ name: 'c-vas-panel-action' });

      expect(action.attributes('text')).toBe(packageJson.version);
    });
  });

  describe('update check', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test('shows no badge when latest tag matches current version', async () => {
      const body = JSON.stringify([{ name: `v${packageJson.version}` }]);

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body)));

      const wrapper = mountComponent();

      await vi.runAllTimersAsync();
      await wrapper.vm.$nextTick();

      expect((wrapper.vm as unknown as { updateAvailable: boolean }).updateAvailable).toBe(false);
    });

    test('sets updateAvailable and latestVersion when a newer tag exists', async () => {
      const body = JSON.stringify([{ name: 'v99.0.0' }]);

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body)));

      const wrapper = mountComponent();

      await vi.runAllTimersAsync();
      await wrapper.vm.$nextTick();

      const vm = wrapper.vm as unknown as { updateAvailable: boolean; latestVersion: string | null };

      expect(vm.updateAvailable).toBe(true);
      expect(vm.latestVersion).toBe('99.0.0');
    });

    test('tooltip contains the newer version string', async () => {
      const body = JSON.stringify([{ name: 'v99.0.0' }]);

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body)));

      const wrapper = mountComponent();

      await vi.runAllTimersAsync();
      await wrapper.vm.$nextTick();

      const tooltip = (wrapper.vm as unknown as { updateTooltip: string | undefined }).updateTooltip;

      expect(tooltip).toContain('v99.0.0');
    });

    test('silently ignores fetch failure', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));

      const wrapper = mountComponent();

      await vi.runAllTimersAsync();
      await wrapper.vm.$nextTick();

      expect((wrapper.vm as unknown as { updateAvailable: boolean }).updateAvailable).toBe(false);
    });

    test('silently ignores non-OK response', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })));

      const wrapper = mountComponent();

      await vi.runAllTimersAsync();
      await wrapper.vm.$nextTick();

      expect((wrapper.vm as unknown as { updateAvailable: boolean }).updateAvailable).toBe(false);
    });
  });
});
