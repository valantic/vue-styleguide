import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasRadio from '../../../../src/elements/e-vas-radio.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountRadio = (props = {}) =>
  mount(eVasRadio, {
    global: {
      plugins: [vueBemCn],
    },
    props: { name: 'field', value: 'a', modelValue: '', ...props },
    slots: { default: 'Label' },
  });

describe('e-vas-radio', () => {
  test('is not checked when modelValue does not match value', () => {
    const wrapper = mountRadio({ modelValue: 'b', value: 'a' });

    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false);
    expect(wrapper.classes()).not.toContain('e-vas-radio--selected');
  });

  test('is checked when modelValue matches value', () => {
    const wrapper = mountRadio({ modelValue: 'a', value: 'a' });

    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true);
    expect(wrapper.classes()).toContain('e-vas-radio--selected');
  });

  test('emits update:modelValue and change when selected', async () => {
    const wrapper = mountRadio({ modelValue: 'b', value: 'a' });

    await wrapper.find('input').setValue();

    expect(wrapper.emitted('update:modelValue')).toContainEqual(['a']);
    expect(wrapper.emitted('change')).toContainEqual(['a']);
  });

  test('shares the same name attribute for grouping', () => {
    const wrapper = mountRadio({ name: 'group-name' });

    expect(wrapper.find('input').attributes('name')).toBe('group-name');
  });

  test('renders the default slot as label text', () => {
    const wrapper = mountRadio();

    expect(wrapper.text()).toContain('Label');
  });
});
