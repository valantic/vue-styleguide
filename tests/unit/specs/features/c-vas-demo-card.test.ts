import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import cVasDemoCard from '../../../../src/features/c-vas-demo-card.vue';
import { vasDemoThemeModeKey } from '../../../../src/features/demo-theme-mode';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';
import { useVasSettingsStore } from '../../../../src/stores/settings';

const mountDemoCard = (props = {}, slots = {}, provide = {}) =>
  mount(cVasDemoCard, {
    global: {
      plugins: [vueBemCn],
      provide,
    },
    props,
    slots: { demo: '<button>Action</button>', ...slots },
  });

describe('c-vas-demo-card', () => {
  afterEach(() => {
    useVasSettingsStore().setDemoThemeMode(null);
  });

  test('renders the demo slot once, on the light theme by default', () => {
    const wrapper = mountDemoCard();
    const panes = wrapper.findAll('.c-vas-demo-card__demo-pane');

    expect(panes).toHaveLength(1);
    expect(panes[0]?.classes()).toContain('vas-styleguide-theme-light');
    expect(wrapper.find('.c-vas-demo-card__header .c-vas-demo-card__theme-toggle').text()).toBe('Dark mode');
  });

  test('switches the pane theme with the toggle', async () => {
    const wrapper = mountDemoCard();

    await wrapper.find('.c-vas-demo-card__theme-toggle input').setValue(true);

    const pane = wrapper.find('.c-vas-demo-card__demo-pane');

    expect(pane.classes()).toContain('vas-styleguide-theme-dark');
    expect(pane.classes()).not.toContain('vas-styleguide-theme-light');
  });

  test('compares light and dark side by side with themeMode compare', () => {
    const wrapper = mountDemoCard({ themeMode: 'compare' });
    const panes = wrapper.findAll('.c-vas-demo-card__demo-pane');

    expect(panes).toHaveLength(2);
    expect(panes[0]?.classes()).toContain('vas-styleguide-theme-light');
    expect(panes[1]?.classes()).toContain('vas-styleguide-theme-dark');
    expect(wrapper.findAll('.c-vas-demo-card__demo-pane button')).toHaveLength(2);
    expect(wrapper.findAll('form.c-vas-demo-card__demo-pane')).toHaveLength(2);
    expect(wrapper.findAll('.c-vas-demo-card__theme-toggle')).toHaveLength(0);
  });

  test('uses the globally provided theme mode', () => {
    const wrapper = mountDemoCard({}, {}, { [vasDemoThemeModeKey as symbol]: 'compare' });

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(2);
  });

  test('lets the themeMode prop override the globally provided mode', () => {
    const wrapper = mountDemoCard({ themeMode: 'toggle' }, {}, { [vasDemoThemeModeKey as symbol]: 'compare' });

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(1);
    expect(wrapper.findAll('.c-vas-demo-card__theme-toggle')).toHaveLength(1);
  });

  test('lets the stored setting win over the provided mode', () => {
    useVasSettingsStore().setDemoThemeMode('toggle');

    const wrapper = mountDemoCard({}, {}, { [vasDemoThemeModeKey as symbol]: 'compare' });

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(1);
  });

  test('lets the themeMode prop win over the stored setting', () => {
    useVasSettingsStore().setDemoThemeMode('compare');

    const wrapper = mountDemoCard({ themeMode: 'toggle' });

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(1);
  });

  test('follows the stored setting live', async () => {
    const wrapper = mountDemoCard();

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(1);

    useVasSettingsStore().setDemoThemeMode('compare');
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(2);
  });

  test('renders the demo slot without pane and toggle with singleTheme', () => {
    const wrapper = mountDemoCard({ singleTheme: true });

    expect(wrapper.findAll('.c-vas-demo-card__demo-pane')).toHaveLength(0);
    expect(wrapper.findAll('.c-vas-demo-card__theme-toggle')).toHaveLength(0);
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
