import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import eVasInput from '../../../../src/elements/e-vas-input.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountInput = (props = {}) =>
  mount(eVasInput, {
    global: {
      plugins: [vueBemCn],
    },
    props: { name: 'field', modelValue: '', ...props },
  });

describe('e-vas-input', () => {
  test('renders the modelValue in the input', () => {
    const wrapper = mountInput({ modelValue: 'hello' });

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('hello');
  });

  test('emits update:modelValue on input', async () => {
    const wrapper = mountInput();
    const input = wrapper.find('input');

    await input.setValue('typed value');

    expect(wrapper.emitted('update:modelValue')).toContainEqual(['typed value']);
  });

  test('updates internal value when modelValue prop changes from parent', async () => {
    const wrapper = mountInput({ modelValue: 'first' });

    await wrapper.setProps({ modelValue: 'second' });

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('second');
  });

  test('emits focus and blur events', async () => {
    const wrapper = mountInput();
    const input = wrapper.find('input');

    await input.trigger('focus');
    expect(wrapper.emitted('focus')).toHaveLength(1);

    await input.trigger('blur');
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });

  test('emits enter on keyup.enter', async () => {
    const wrapper = mountInput();

    await wrapper.find('input').trigger('keyup.enter');

    expect(wrapper.emitted('enter')).toHaveLength(1);
  });

  test('defaults the type modifier class to "text" when no type attr is set', () => {
    const wrapper = mountInput();

    expect(wrapper.classes()).toContain('e-vas-input--type-text');
  });

  test('reflects the given type attribute in the modifier class', () => {
    const wrapper = mountInput({ type: 'number' });

    expect(wrapper.classes()).toContain('e-vas-input--type-number');
    expect(wrapper.find('input').attributes('type')).toBe('number');
  });

  test('sets the name attribute', () => {
    const wrapper = mountInput({ name: 'my-field' });

    expect(wrapper.find('input').attributes('name')).toBe('my-field');
  });
});
