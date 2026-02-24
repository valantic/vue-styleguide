import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import viewportPlugin from '@/plugins/viewport';

describe('Viewport Plugin', () => {
  const comp = {
    template: '<div></div>',
  };

  test('should initialize with current window.innerWidth', () => {
    vi.stubGlobal('innerWidth', 1024);
    const { vm } = mount(comp, {
      global: {
        plugins: [viewportPlugin],
      },
    });

    expect(vm.$viewport.isMd).toBe(true);
    expect(vm.$viewport.currentViewport).toBe('md');
    vi.unstubAllGlobals();
  });

  test('should update viewport on window resize', async () => {
    vi.stubGlobal('innerWidth', 1024);
    const { vm } = mount(comp, {
      global: {
        plugins: [viewportPlugin],
      },
    });

    expect(vm.$viewport.currentViewport).toBe('md');

    // Simulate resize
    vi.stubGlobal('innerWidth', 1440);
    window.dispatchEvent(new Event('resize'));

    // This should now pass
    expect(vm.$viewport.currentViewport).toBe('xl');
    vi.unstubAllGlobals();
  });

  test('should no longer update viewport on resizeend', async () => {
    vi.stubGlobal('innerWidth', 1024);
    const { vm } = mount(comp, {
      global: {
        plugins: [viewportPlugin],
      },
    });

    vi.stubGlobal('innerWidth', 1440);
    window.dispatchEvent(new Event('resizeend'));

    // This should now fail to update
    expect(vm.$viewport.currentViewport).toBe('md');
    vi.unstubAllGlobals();
  });
});

// New tests for additional computed flags
describe('Viewport additional flags', () => {
  const comp = { template: '<div></div>' };

  test('mobile viewport (< sm)', () => {
    vi.stubGlobal('innerWidth', 479); // below xs=480 and sm=768
    const { vm } = mount(comp, { global: { plugins: [viewportPlugin] } });

    expect(vm.$viewport.isDesktop).toBe(false);
    expect(vm.$viewport.isTablet).toBe(false);
    expect(vm.$viewport.isSmallerThanDesktop).toBe(true);
    expect(vm.$viewport.isSmallerThanTablet).toBe(true);
    expect(vm.$viewport.isBiggerThanMobile).toBe(false);
    expect(vm.$viewport.isBiggerThanTablet).toBe(false);
    vi.unstubAllGlobals();
  });

  test('tablet viewport ([sm, md))', () => {
    vi.stubGlobal('innerWidth', 800); // >= sm (768) and < md (1024)
    const { vm } = mount(comp, { global: { plugins: [viewportPlugin] } });

    expect(vm.$viewport.isDesktop).toBe(false);
    expect(vm.$viewport.isTablet).toBe(true);
    expect(vm.$viewport.isSmallerThanDesktop).toBe(true);
    expect(vm.$viewport.isSmallerThanTablet).toBe(false);
    expect(vm.$viewport.isBiggerThanMobile).toBe(true);
    expect(vm.$viewport.isBiggerThanTablet).toBe(false);
    vi.unstubAllGlobals();
  });

  test('desktop viewport (>= md)', () => {
    vi.stubGlobal('innerWidth', 1300); // >= md (1024)
    const { vm } = mount(comp, { global: { plugins: [viewportPlugin] } });

    expect(vm.$viewport.isDesktop).toBe(true);
    expect(vm.$viewport.isTablet).toBe(false);
    expect(vm.$viewport.isSmallerThanDesktop).toBe(false);
    expect(vm.$viewport.isSmallerThanTablet).toBe(false);
    expect(vm.$viewport.isBiggerThanMobile).toBe(true);
    expect(vm.$viewport.isBiggerThanTablet).toBe(true);
    vi.unstubAllGlobals();
  });
});
