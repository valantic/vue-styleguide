import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasCheckbox from '../../../../src/elements/e-vas-checkbox.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountCheckbox = (props = {}) =>
  mount(eVasCheckbox, {
    global: {
      plugins: [vueBemCn],
    },
    props: { name: 'field', modelValue: false, ...props },
    slots: { default: 'Label' },
  });

describe('e-vas-checkbox', () => {
  describe('boolean mode', () => {
    test('reflects an unchecked modelValue', () => {
      const wrapper = mountCheckbox({ modelValue: false });

      expect(wrapper.find('input').attributes('aria-checked')).toBe('false');
    });

    test('reflects a checked modelValue', () => {
      const wrapper = mountCheckbox({ modelValue: true });

      expect(wrapper.find('input').attributes('aria-checked')).toBe('true');
    });

    test('emits update:modelValue and change on toggle', async () => {
      const wrapper = mountCheckbox({ modelValue: false });

      await wrapper.find('input').setValue(true);

      expect(wrapper.emitted('update:modelValue')).toContainEqual([true]);
      expect(wrapper.emitted('change')).toContainEqual([true]);
    });
  });

  describe('group (array) mode', () => {
    test('is not checked when its value is missing from the modelValue array', () => {
      const wrapper = mountCheckbox({ modelValue: ['b', 'c'], value: 'a' });

      expect(wrapper.find('input').attributes('aria-checked')).toBe('false');
    });

    test('is checked when its value is present in the modelValue array', () => {
      const wrapper = mountCheckbox({ modelValue: ['a', 'b'], value: 'a' });

      expect(wrapper.find('input').attributes('aria-checked')).toBe('true');
    });
  });

  test('emits focus and blur', async () => {
    const wrapper = mountCheckbox();
    const input = wrapper.find('input');

    await input.trigger('focus');
    expect(wrapper.emitted('focus')).toHaveLength(1);

    await input.trigger('blur');
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });

  test('applies the variant modifier class', () => {
    const wrapper = mountCheckbox({ variant: 'toggle' });

    expect(wrapper.classes()).toContain('e-vas-checkbox--variant-toggle');
  });

  test('renders the default slot as label text', () => {
    const wrapper = mountCheckbox();

    expect(wrapper.text()).toContain('Label');
  });
});
