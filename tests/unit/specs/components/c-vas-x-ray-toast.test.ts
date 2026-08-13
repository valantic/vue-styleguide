import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import cVasXRayToast from '../../../../src/components/c-vas-x-ray-toast.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';
import { useVasSettingsStore } from '../../../../src/stores/settings';

type ToastInstance = { visible: boolean; message: string };

const mountComponent = () => mount(cVasXRayToast, { global: { plugins: [vueBemCn] } });
const vm = (wrapper: ReturnType<typeof mountComponent>) => wrapper.vm as unknown as ToastInstance;

describe('c-vas-x-ray-toast', () => {
  const vasSettingsStore = useVasSettingsStore();

  beforeEach(() => {
    vi.useFakeTimers();
    vasSettingsStore.setXRayModeEnabled(false);
  });

  afterEach(() => {
    vasSettingsStore.setXRayModeEnabled(false);
    vi.useRealTimers();
  });

  test('is not visible initially', () => {
    expect(vm(mountComponent()).visible).toBe(false);
  });

  test('shows an "enabled" message when x-ray mode is turned on', async () => {
    const wrapper = mountComponent();

    vasSettingsStore.setXRayModeEnabled(true);
    await wrapper.vm.$nextTick();

    expect(vm(wrapper).visible).toBe(true);
    expect(vm(wrapper).message).toBe('X-ray mode enabled');
  });

  test('shows a "disabled" message when x-ray mode is turned off', async () => {
    vasSettingsStore.setXRayModeEnabled(true);

    const wrapper = mountComponent();

    vasSettingsStore.setXRayModeEnabled(false);
    await wrapper.vm.$nextTick();

    expect(vm(wrapper).visible).toBe(true);
    expect(vm(wrapper).message).toBe('X-ray mode disabled');
  });

  test('hides itself again once the visible duration elapses', async () => {
    const wrapper = mountComponent();

    vasSettingsStore.setXRayModeEnabled(true);
    await wrapper.vm.$nextTick();

    expect(vm(wrapper).visible).toBe(true);

    await vi.advanceTimersByTimeAsync(3000);

    expect(vm(wrapper).visible).toBe(false);
  });

  test('restarts the hide timer on a rapid re-toggle instead of hiding early', async () => {
    const wrapper = mountComponent();

    vasSettingsStore.setXRayModeEnabled(true);
    await wrapper.vm.$nextTick();

    await vi.advanceTimersByTimeAsync(2000);
    vasSettingsStore.setXRayModeEnabled(false);
    await wrapper.vm.$nextTick();

    await vi.advanceTimersByTimeAsync(2000);

    // Still visible: the second toggle reset the ~2.5s timer, so only 2s have passed since then.
    expect(vm(wrapper).visible).toBe(true);
    expect(vm(wrapper).message).toBe('X-ray mode disabled');
  });
});
