import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasField from '../../../../src/elements/e-vas-field.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountField = (props = {}, slots = {}) =>
  mount(eVasField, {
    global: {
      plugins: [vueBemCn],
    },
    props,
    slots: { default: '<input>', ...slots },
  });

describe('e-vas-field', () => {
  test('renders no label element without a label', () => {
    const wrapper = mountField();

    expect(wrapper.find('label').exists()).toBe(false);
    expect(wrapper.classes()).not.toContain('e-vas-field--has-label');
  });

  test('renders the label and marks the field as labelled', () => {
    const wrapper = mountField({ label: 'First name' });

    expect(wrapper.find('label').text()).toBe('First name');
    expect(wrapper.classes()).toContain('e-vas-field--has-label');
  });

  test('connects the label with the control via the fieldId', () => {
    const wrapper = mountField({ label: 'First name', fieldId: 'my-field' });

    expect(wrapper.find('label').attributes('for')).toBe('my-field');
  });

  test('sets an id on the label so it can be referenced via aria-labelledby', () => {
    const wrapper = mountField({ label: 'First name', labelId: 'my-label' });

    expect(wrapper.find('label').attributes('id')).toBe('my-label');
  });

  test('floats the label only while active', async () => {
    const wrapper = mountField({ label: 'First name' });

    expect(wrapper.classes()).not.toContain('e-vas-field--active');

    await wrapper.setProps({ active: true });

    expect(wrapper.classes()).toContain('e-vas-field--active');
  });

  test('applies the focus modifier', () => {
    const wrapper = mountField({ focused: true });

    expect(wrapper.classes()).toContain('e-vas-field--focus');
  });

  test('applies the disabled modifier', () => {
    const wrapper = mountField({ disabled: true });

    expect(wrapper.classes()).toContain('e-vas-field--disabled');
  });

  test('applies the state modifier', () => {
    const wrapper = mountField({ state: 'error' });

    expect(wrapper.classes()).toContain('e-vas-field--state-error');
  });

  // `setup/scss/_basics.scss` excludes `.e-vas-field__control > *` from its global
  // `:focus-visible` outline, so the field can draw the focus ring across its full width
  // instead of only around the control. Renaming the element would silently break that.
  test('wraps the control in an element named "__control"', () => {
    const wrapper = mountField();

    expect(wrapper.find('.e-vas-field__control > input').exists()).toBe(true);
  });

  test('renders the append slot and flags it', () => {
    const wrapper = mountField({}, { append: '<i>icon</i>' });

    expect(wrapper.find('.e-vas-field__append').text()).toBe('icon');
    expect(wrapper.classes()).toContain('e-vas-field--has-append');
  });
});
