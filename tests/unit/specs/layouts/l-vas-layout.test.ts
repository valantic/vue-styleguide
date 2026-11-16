import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import lVasLayout from '../../../../src/layouts/l-vas-layout.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountLayout = (props = {}) =>
  mount(lVasLayout, {
    global: {
      plugins: [vueBemCn],
      mocks: { $route: { name: 'demo-page', meta: { title: 'Demo page' } } },
    },
    props,
    slots: { default: '<button>Action</button>' },
  });

describe('l-vas-layout', () => {
  test('renders the headline, default padding and default variant by default', () => {
    const wrapper = mountLayout();

    expect(wrapper.find('.l-vas-layout__headline').text()).toBe('Demo page');
    expect(wrapper.classes()).toContain('l-vas-layout--padding-default');
    expect(wrapper.classes()).toContain('l-vas-layout--variant-default');
    expect(wrapper.classes()).not.toContain('l-vas-layout--bare');
  });

  test('hides the headline with showHeadline false', () => {
    expect(mountLayout({ showHeadline: false }).find('.l-vas-layout__headline').exists()).toBe(false);
  });

  test('bare adds the bare modifier and removes the headline', () => {
    const wrapper = mountLayout({ bare: true });

    expect(wrapper.classes()).toContain('l-vas-layout--bare');
    expect(wrapper.find('.l-vas-layout__headline').exists()).toBe(false);
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
