import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import vasXRayInspector from '../../../../src/plugins/x-ray-inspector';
import { hasComponentMarker } from '../../../../src/utils/vue-component-inspector';

describe('vasXRayInspector', () => {
  test('marks a mounted component root element with its name', () => {
    const comp = { name: 'hello', template: '<div>Hello</div>' };

    const wrapper = mount(comp, { global: { plugins: [vasXRayInspector] } });

    expect(hasComponentMarker(wrapper.element)).toBe(true);
  });

  test('does not mark anything when the plugin is not installed', () => {
    const comp = { name: 'hello', template: '<div>Hello</div>' };

    const wrapper = mount(comp);

    expect(hasComponentMarker(wrapper.element)).toBe(false);
  });

  test('marks every component sharing the same root element, not just the outermost one', () => {
    const child = { name: 'child', template: '<button>Click</button>' };
    const parent = { name: 'parent', components: { child }, template: '<child />' };

    const wrapper = mount(parent, { global: { plugins: [vasXRayInspector] } });

    expect(hasComponentMarker(wrapper.element)).toBe(true);
  });
});
