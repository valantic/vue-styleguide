import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasSelect from '../../../../src/elements/e-vas-select.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

const mountSelect = (props = {}) =>
  mount(eVasSelect, {
    global: {
      plugins: [vueBemCn],
      stubs: { 'e-vas-icon': true, 'e-vas-progress': true },
    },
    props: { options, modelValue: '', ...props },
  });

describe('e-vas-select', () => {
  test('renders an option per entry in options', () => {
    const wrapper = mountSelect();
    const optionLabels = wrapper.findAll('option').map((option) => option.text());

    expect(optionLabels).toContain('Option A');
    expect(optionLabels).toContain('Option B');
  });

  test('shows the placeholder as the first option by default', () => {
    const wrapper = mountSelect({ placeholder: 'Choose one' });
    const firstOption = wrapper.find('option');

    expect(firstOption.text()).toBe('Choose one');
    expect(firstOption.attributes('disabled')).toBeDefined();
  });

  test('makes the placeholder selectable when hasSelectablePlaceholder is true', () => {
    const wrapper = mountSelect({ placeholder: 'Choose one', hasSelectablePlaceholder: true });
    const firstOption = wrapper.find('option');

    expect(firstOption.attributes('disabled')).toBeUndefined();
  });

  test('does not render a placeholder option when placeholder is false', () => {
    const wrapper = mountSelect({ placeholder: false });

    expect(wrapper.findAll('option')).toHaveLength(options.length);
  });

  test('emits update:modelValue when an option is selected', async () => {
    const wrapper = mountSelect();

    await wrapper.find('select').setValue('b');

    expect(wrapper.emitted('update:modelValue')).toContainEqual(['b']);
  });

  test('disables the select while progress is true', () => {
    const wrapper = mountSelect({ progress: true });

    expect(wrapper.find('select').attributes('disabled')).toBeDefined();
  });

  test('disables the select when the disabled attribute is passed', () => {
    const wrapper = mountSelect({ disabled: true });

    expect(wrapper.find('select').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.e-vas-field').classes()).toContain('e-vas-field--disabled');
  });

  test('supports custom valueField/labelField', () => {
    const wrapper = mountSelect({
      options: [{ id: 'x', name: 'Option X' }],
      valueField: 'id',
      labelField: 'name',
    });
    const customOption = wrapper.find('option:last-child');

    expect(customOption.attributes('value')).toBe('x');
    expect(customOption.text()).toBe('Option X');
  });

  describe('label', () => {
    test('renders no label element without a label', () => {
      expect(mountSelect().find('label').exists()).toBe(false);
    });

    test('renders the label and connects it with the select', () => {
      const wrapper = mountSelect({ label: 'Category' });
      const id = wrapper.find('select').attributes('id');

      expect(wrapper.find('label').text()).toBe('Category');
      expect(wrapper.find('label').attributes('for')).toBe(id);
    });

    test('always floats the label, since a select always shows a value or its placeholder', () => {
      const wrapper = mountSelect({ label: 'Category' });

      expect(wrapper.classes()).toContain('e-vas-field--active');
    });
  });
});
