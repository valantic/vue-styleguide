import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasMultiselect from '../../../../src/elements/e-vas-multiselect.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

const mountMultiselect = (props = {}) =>
  mount(eVasMultiselect, {
    global: {
      plugins: [vueBemCn],
      stubs: { 'e-vas-progress': true },
    },
    props: { options, modelValue: [], ...props },
    attachTo: document.body,
  });

describe('e-vas-multiselect', () => {
  test('shows the placeholder when no option is selected', () => {
    const wrapper = mountMultiselect({ placeholder: 'Pick some' });

    expect(wrapper.find('.e-vas-multiselect__output-value').text()).toBe('Pick some');
  });

  test('shows the joined labels of the selected options', () => {
    const wrapper = mountMultiselect({ modelValue: ['a', 'b'] });

    expect(wrapper.find('.e-vas-multiselect__output-value').text()).toBe('Option A, Option B');
  });

  test('opens the options list when the trigger button is clicked', async () => {
    const wrapper = mountMultiselect();

    expect(wrapper.find('.e-vas-multiselect__options-wrapper').isVisible()).toBe(false);

    await wrapper.find('.e-vas-multiselect__field-wrapper').trigger('click');

    expect(wrapper.find('.e-vas-multiselect__options-wrapper').isVisible()).toBe(true);
  });

  test('emits update:modelValue when an option checkbox is toggled', async () => {
    const wrapper = mountMultiselect();

    await wrapper.find('.e-vas-multiselect__field-wrapper').trigger('click');
    await wrapper.find('input[type="checkbox"]').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toContainEqual([['a']]);
  });

  test('does not open when disabled', async () => {
    const wrapper = mountMultiselect({ disabled: true });

    expect(wrapper.find('.e-vas-multiselect__field-wrapper').attributes('disabled')).toBeDefined();
  });

  test('filters options by the search term when hasSearch is enabled', async () => {
    const wrapper = mountMultiselect({ hasSearch: true });

    await wrapper.find('.e-vas-multiselect__field-wrapper').trigger('click');
    await wrapper.find('.e-vas-multiselect__search-field').setValue('A');

    const labels = wrapper.findAll('.e-vas-multiselect__options-item').map((item) => item.text());

    expect(labels).toEqual(['Option A']);
  });

  test('closes and emits close when clicking outside', async () => {
    const wrapper = mountMultiselect();

    await wrapper.find('.e-vas-multiselect__field-wrapper').trigger('click');
    expect(wrapper.find('.e-vas-multiselect__options-wrapper').isVisible()).toBe(true);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.e-vas-multiselect__options-wrapper').isVisible()).toBe(false);
    expect(wrapper.emitted('close')).toBeTruthy();

    wrapper.unmount();
  });

  describe('label', () => {
    test('renders no label element without a label', () => {
      const wrapper = mountMultiselect();

      expect(wrapper.find('.e-vas-field__label').exists()).toBe(false);

      wrapper.unmount();
    });

    test('references the label from the trigger, which cannot be targeted by a "for" attribute', () => {
      const wrapper = mountMultiselect({ label: 'Tags' });
      const labelId = wrapper.find('.e-vas-field__label').attributes('id');

      expect(wrapper.find('.e-vas-field__label').text()).toBe('Tags');
      expect(labelId).toBeDefined();
      expect(wrapper.find('.e-vas-multiselect__field-wrapper').attributes('aria-labelledby')).toBe(labelId);

      wrapper.unmount();
    });

    test('floats the label while the control shows its placeholder', () => {
      const wrapper = mountMultiselect({ label: 'Tags', placeholder: 'Pick some' });

      expect(wrapper.find('.e-vas-field').classes()).toContain('e-vas-field--active');

      wrapper.unmount();
    });

    test('keeps the label inside the field while the control is empty', () => {
      const wrapper = mountMultiselect({ label: 'Tags', placeholder: false });

      expect(wrapper.find('.e-vas-field').classes()).not.toContain('e-vas-field--active');

      wrapper.unmount();
    });
  });
});
