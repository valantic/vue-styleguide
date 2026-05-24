import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import cVasPanelAction from '../../../../src/components/c-vas-panel-action.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

describe('c-vas-panel-action', () => {
  const globalConfig = {
    plugins: [vueBemCn],
    stubs: {
      'c-vas-tooltip': {
        template: '<span><slot /></span>',
      },
      'e-vas-icon': true,
    },
  };

  test('emits click when not disabled', async () => {
    const wrapper = mount(cVasPanelAction, {
      global: globalConfig,
      props: { disabled: false },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  test('does not emit click when disabled', async () => {
    const wrapper = mount(cVasPanelAction, {
      global: globalConfig,
      props: { disabled: true },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
