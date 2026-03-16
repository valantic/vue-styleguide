import { mount } from '@vue/test-utils';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { Viewport, addViewportResizeEvent, removeViewportResizeEvent, useViewport } from '@/plugins/viewport';

describe('Viewport Plugin', () => {
  const comp = {
    template: '<div></div>',
  };
  const viewport: Viewport = useViewport();

  beforeAll(() => {
    addViewportResizeEvent();
  });

  afterAll(() => {
    removeViewportResizeEvent();
  });

  test('should initialize with current window.innerWidth', () => {
    vi.stubGlobal('innerWidth', 1024);
    viewport.sync();
    mount(comp);

    expect(viewport.isMd).toBe(true);
    expect(viewport.currentViewport).toBe('md');
    vi.unstubAllGlobals();
  });

  test('should update viewport on window resize', async () => {
    vi.stubGlobal('innerWidth', 1024);
    viewport.sync();
    mount(comp);

    expect(viewport.currentViewport).toBe('md');

    // Simulate resize
    vi.stubGlobal('innerWidth', 1440);
    window.dispatchEvent(new Event('resize'));

    // This should now pass
    expect(viewport.currentViewport).toBe('xl');
    vi.unstubAllGlobals();
  });

  test('should no longer update viewport on resizeend', async () => {
    vi.stubGlobal('innerWidth', 1024);
    viewport.sync();
    mount(comp);

    vi.stubGlobal('innerWidth', 1440);
    window.dispatchEvent(new Event('resizeend'));

    // This should now fail to update
    expect(viewport.currentViewport).toBe('md');
    vi.unstubAllGlobals();
  });
});

// New tests for additional computed flags
describe('Viewport additional flags', () => {
  const viewport: Viewport = useViewport();

  test('mobile viewport (< sm)', () => {
    vi.stubGlobal('innerWidth', 479); // below xs=480 and sm=768
    viewport.sync();

    expect(viewport.isDesktop).toBe(false);
    expect(viewport.isTablet).toBe(false);
    expect(viewport.isSmallerThanDesktop).toBe(true);
    expect(viewport.isSmallerThanTablet).toBe(true);
    expect(viewport.isBiggerThanMobile).toBe(false);
    expect(viewport.isBiggerThanTablet).toBe(false);
    vi.unstubAllGlobals();
  });

  test('tablet viewport ([sm, md))', () => {
    vi.stubGlobal('innerWidth', 800); // >= sm (768) and < md (1024)
    viewport.sync();

    expect(viewport.isDesktop).toBe(false);
    expect(viewport.isTablet).toBe(true);
    expect(viewport.isSmallerThanDesktop).toBe(true);
    expect(viewport.isSmallerThanTablet).toBe(false);
    expect(viewport.isBiggerThanMobile).toBe(true);
    expect(viewport.isBiggerThanTablet).toBe(false);
    vi.unstubAllGlobals();
  });

  test('desktop viewport (>= md)', () => {
    vi.stubGlobal('innerWidth', 1300); // >= md (1024)
    viewport.sync();

    expect(viewport.isDesktop).toBe(true);
    expect(viewport.isTablet).toBe(false);
    expect(viewport.isSmallerThanDesktop).toBe(false);
    expect(viewport.isSmallerThanTablet).toBe(false);
    expect(viewport.isBiggerThanMobile).toBe(true);
    expect(viewport.isBiggerThanTablet).toBe(true);
    vi.unstubAllGlobals();
  });
});
