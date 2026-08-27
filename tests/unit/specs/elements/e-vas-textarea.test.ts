import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasTextarea from '../../../../src/elements/e-vas-textarea.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountTextarea = (props = {}) =>
  mount(eVasTextarea, {
    global: {
      plugins: [vueBemCn],
    },
    props: { name: 'field', modelValue: '', ...props },
  });

describe('e-vas-textarea', () => {
  test('renders the modelValue in the textarea', () => {
    const wrapper = mountTextarea({ modelValue: 'hello' });

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('hello');
  });

  test('emits update:modelValue on input', async () => {
    const wrapper = mountTextarea();

    await wrapper.find('textarea').setValue('typed value');

    expect(wrapper.emitted('update:modelValue')).toContainEqual(['typed value']);
  });

  test('updates internal value when modelValue prop changes from parent', async () => {
    const wrapper = mountTextarea({ modelValue: 'first' });

    await wrapper.setProps({ modelValue: 'second' });

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('second');
  });

  test('emits focus and blur events', async () => {
    const wrapper = mountTextarea();
    const textarea = wrapper.find('textarea');

    await textarea.trigger('focus');
    expect(wrapper.emitted('focus')).toHaveLength(1);

    await textarea.trigger('blur');
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });

  test('renders the label and connects it with the textarea', () => {
    const wrapper = mountTextarea({ label: 'Description' });
    const id = wrapper.find('textarea').attributes('id');

    expect(wrapper.find('label').text()).toBe('Description');
    expect(wrapper.find('label').attributes('for')).toBe(id);
  });

  test('defaults to five rows and takes the given amount', () => {
    expect(mountTextarea().find('textarea').attributes('rows')).toBe('5');
    expect(mountTextarea({ rows: 3 }).find('textarea').attributes('rows')).toBe('3');
  });

  test('forces the no-resize modifier while auto growing', () => {
    const wrapper = mountTextarea({ autoGrow: true });

    expect(wrapper.classes()).toContain('e-vas-textarea--auto-grow');
    expect(wrapper.classes()).toContain('e-vas-textarea--no-resize');
  });

  test('sets the name attribute', () => {
    const wrapper = mountTextarea({ name: 'my-field' });

    expect(wrapper.find('textarea').attributes('name')).toBe('my-field');
  });
});
