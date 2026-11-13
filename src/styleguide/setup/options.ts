import { vasDemoThemeModeKey } from '../../features/demo-theme-mode';
import styleguide from '../styleguide.vue';

export default {
  template: '<styleguide />',
  components: {
    styleguide,
  },

  // This styleguide documents the components, so every demo card compares both themes.
  provide: {
    [vasDemoThemeModeKey as symbol]: 'compare',
  },
};
