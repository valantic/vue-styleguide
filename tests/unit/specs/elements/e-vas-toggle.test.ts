import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasToggle from '../../../../src/elements/e-vas-toggle.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountToggle = (props = {}, slots = {}) =>
  mount(eVasToggle, {
    global: {
      plugins: [vueBemCn],
    },
    props,
    slots,
  });

describe('e-vas-toggle', () => {
  test('reflects the modelValue with the active modifier', () => {
    expect(mountToggle({ modelValue: false }).classes()).not.toContain('e-vas-toggle--active');
    expect(mountToggle({ modelValue: true }).classes()).toContain('e-vas-toggle--active');
  });

  test('shows a check icon while on and a close icon while off', async () => {
    const wrapper = mountToggle({ modelValue: false });
    const iconClasses = () => wrapper.find('.e-vas-toggle__thumb-icon').classes();

    expect(iconClasses()).toContain('e-vas-icon--i-close');

    await wrapper.setProps({ modelValue: true });

    expect(iconClasses()).toContain('e-vas-icon--i-check');
  });

  test('emits update:modelValue on toggle', async () => {
    const wrapper = mountToggle({ modelValue: false });

    await wrapper.find('input').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toContainEqual([true]);
  });

  test('renders the label property', () => {
    const wrapper = mountToggle({ label: 'Notifications' });

    expect(wrapper.find('.e-vas-toggle__label').text()).toBe('Notifications');
  });

  test('prefers the default slot over the label property', () => {
    const wrapper = mountToggle({ label: 'From prop' }, { default: 'From slot' });

    expect(wrapper.find('.e-vas-toggle__label').text()).toBe('From slot');
  });

  test('renders no label element without a label', () => {
    const wrapper = mountToggle();

    expect(wrapper.find('.e-vas-toggle__label').exists()).toBe(false);
  });

  test('forwards the disabled attribute to the input', () => {
    const wrapper = mountToggle({ disabled: true });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  test('emits focus and blur', async () => {
    const wrapper = mountToggle();
    const input = wrapper.find('input');

    await input.trigger('focus');
    expect(wrapper.emitted('focus')).toHaveLength(1);

    await input.trigger('blur');
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });
});
