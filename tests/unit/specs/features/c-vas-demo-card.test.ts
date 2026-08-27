import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import cVasDemoCard from '../../../../src/features/c-vas-demo-card.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

const mountDemoCard = (props = {}, slots = {}) =>
  mount(cVasDemoCard, {
    global: {
      plugins: [vueBemCn],
    },
    props,
    slots: { demo: '<button>Action</button>', ...slots },
  });

describe('c-vas-demo-card', () => {
  test('renders the demo slot once per theme', () => {
    const wrapper = mountDemoCard();

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(2);
    expect(wrapper.findAll('.c-vas-demo-card__demo-pane button')).toHaveLength(2);
  });

  test('applies the theme class to each pane', () => {
    const wrapper = mountDemoCard();
    const panes = wrapper.findAll('.c-vas-demo-card__demo-pane');

    expect(panes[0]?.classes()).toContain('vas-styleguide-theme-light');
    expect(panes[1]?.classes()).toContain('vas-styleguide-theme-dark');
  });

  test('wraps each pane in its own form, so radio groups stay separated', () => {
    const wrapper = mountDemoCard();

    expect(wrapper.findAll('form.c-vas-demo-card__demo-pane')).toHaveLength(2);
  });

  test('renders the demo slot only once with singleTheme', () => {
    const wrapper = mountDemoCard({ singleTheme: true });

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(0);
    expect(wrapper.findAll('.c-vas-demo-card__demo button')).toHaveLength(1);
    expect(wrapper.classes()).toContain('c-vas-demo-card--single-theme');
  });

  test('applies the force-configuration-top modifier the SCSS actually targets', () => {
    const wrapper = mountDemoCard({ forceConfigurationTop: true });

    expect(wrapper.classes()).toContain('c-vas-demo-card--force-configuration-top');
  });

  test('renders the header and sidebar slots only once', () => {
    const wrapper = mountDemoCard({}, { header: '<h2>Title</h2>', sidebar: '<i>Config</i>' });

    expect(wrapper.findAll('h2')).toHaveLength(1);
    expect(wrapper.findAll('i')).toHaveLength(1);
  });
});
