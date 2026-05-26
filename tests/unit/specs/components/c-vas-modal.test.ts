import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import cVasModal from '../../../../src/components/c-vas-modal.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

// JSdom does not implement HTMLDialogElement.showModal; provide a no-op stub.
HTMLDialogElement.prototype.showModal = vi.fn();

const mountModal = (props = {}) =>
  mount(cVasModal, {
    global: {
      plugins: [vueBemCn],
      stubs: { 'e-vas-icon': true },
    },
    props: { isOpen: false, ...props },
    attachTo: document.body,
  });

describe('c-vas-modal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('keydown listener lifecycle', () => {
    test('attaches keydown listener when opened', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const wrapper = mountModal({ isOpen: true });

      await wrapper.vm.$nextTick();

      expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    test('removes keydown listener when closed', async () => {
      const removeSpy = vi.spyOn(document, 'removeEventListener');
      const wrapper = mountModal({ isOpen: true });

      await wrapper.vm.$nextTick();
      await wrapper.setProps({ isOpen: false });

      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    test('removes keydown listener on beforeUnmount', async () => {
      const removeSpy = vi.spyOn(document, 'removeEventListener');
      const wrapper = mountModal({ isOpen: true });

      await wrapper.vm.$nextTick();
      wrapper.unmount();

      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  describe('Escape key', () => {
    test('emits update:isOpen=false when Escape is pressed while open', async () => {
      const wrapper = mountModal({ isOpen: true });

      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }));

      expect(wrapper.emitted('update:isOpen')).toContainEqual([false]);
    });

    test('does not emit when Escape is pressed while closed', async () => {
      const wrapper = mountModal({ isOpen: false });

      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }));

      expect(wrapper.emitted('update:isOpen')).toBeFalsy();
    });
  });

  describe('outside click', () => {
    test('emits update:isOpen=false when closeOnOutsideClick is true and dialog is clicked', async () => {
      const wrapper = mountModal({ isOpen: true, closeOnOutsideClick: true });

      await wrapper.vm.$nextTick();

      // Click the dialog backdrop (the dialog element itself, outside its inner div)
      const dialog = wrapper.find('dialog');

      await dialog.trigger('click');

      expect(wrapper.emitted('update:isOpen')).toContainEqual([false]);
    });

    test('does not emit false when closeOnOutsideClick is false', async () => {
      const wrapper = mountModal({ isOpen: true, closeOnOutsideClick: false });

      await wrapper.vm.$nextTick();

      const emissionsBeforeClick = (wrapper.emitted('update:isOpen') as boolean[][] | undefined)?.length ?? 0;

      const dialog = wrapper.find('dialog');

      await dialog.trigger('click');

      const emissionsAfterClick = wrapper.emitted('update:isOpen') as boolean[][] | undefined;

      // No new emissions should have been added.
      expect(emissionsAfterClick?.length ?? 0).toBe(emissionsBeforeClick);
    });
  });
});
