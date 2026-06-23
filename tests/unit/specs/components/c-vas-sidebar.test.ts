import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import cVasSidebar from '../../../../src/components/c-vas-sidebar.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';
import { useVasSessionStore } from '../../../../src/stores/session';

window.matchMedia = vi.fn().mockReturnValue({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
});

type SidebarVm = {
  isMainFlyoutOpen: boolean;
  activePanel: string;
};

const mountSidebar = () =>
  mount(cVasSidebar, {
    global: {
      plugins: [vueBemCn],
      stubs: {
        'c-vas-flyout': true,
        'c-vas-flyout-handle': true,
        'c-vas-hotkey-modal': true,
        'c-vas-panel': true,
      },
    },
    attachTo: document.body,
  });

describe('c-vas-sidebar', () => {
  let wrapper: ReturnType<typeof mountSidebar>;

  afterEach(() => {
    wrapper?.unmount();
    useVasSessionStore().setHasPageConfig(false);
    vi.restoreAllMocks();
  });

  describe('tab-switching hotkeys', () => {
    test('Ctrl+1 opens the flyout and switches to the navigation tab', async () => {
      wrapper = mountSidebar();
      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: '1', ctrlKey: true, bubbles: true }));
      await wrapper.vm.$nextTick();

      const vm = wrapper.vm as unknown as SidebarVm;

      expect(vm.isMainFlyoutOpen).toBe(true);
      expect(vm.activePanel).toBe('navigation');
    });

    test('Ctrl+2 opens the flyout and switches to the globalConfig tab', async () => {
      wrapper = mountSidebar();
      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: '2', ctrlKey: true, bubbles: true }));
      await wrapper.vm.$nextTick();

      const vm = wrapper.vm as unknown as SidebarVm;

      expect(vm.isMainFlyoutOpen).toBe(true);
      expect(vm.activePanel).toBe('globalConfig');
    });

    test('Ctrl+3 opens the flyout and switches to the pageConfig tab when hasPageConfig is true', async () => {
      useVasSessionStore().setHasPageConfig(true);
      wrapper = mountSidebar();
      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: '3', ctrlKey: true, bubbles: true }));
      await wrapper.vm.$nextTick();

      const vm = wrapper.vm as unknown as SidebarVm;

      expect(vm.isMainFlyoutOpen).toBe(true);
      expect(vm.activePanel).toBe('pageConfig');
    });

    test('Ctrl+3 does nothing when hasPageConfig is false', async () => {
      wrapper = mountSidebar();
      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: '3', ctrlKey: true, bubbles: true }));
      await wrapper.vm.$nextTick();

      const vm = wrapper.vm as unknown as SidebarVm;

      expect(vm.isMainFlyoutOpen).toBe(false);
      expect(vm.activePanel).toBe('navigation');
    });
  });
});
