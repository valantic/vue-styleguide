import { RouteMeta as StyleguideRouteMeta } from '../../types/route';

declare module 'vue-router' {
  interface RouteMeta extends StyleguideRouteMeta {
    [key: string]: unknown;
  }
}

export const styleguideRoot = '/sg';
export const sectionWrapper = {
  template: '<router-view />',
};

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: styleguideRoot,
    name: 'sg-styleguide',
    component: sectionWrapper,
    meta: {
      title: 'Styleguide',
    },
    children: [
      {
        path: 'test-readme',
        name: 'test-readme',
        component: () => import('../demo-pages/r-readme.vue'),
        meta: {
          title: 'Readme',
        },
      },
      {
        path: 'test-typography',
        name: 'test-typography',
        component: () => import('../demo-pages/general/r-typography.vue'),
        meta: {
          title: 'Typography',
          alternativeTitles: ['font'],
        },
      },
      {
        path: 'test-page-settings',
        name: 'test-page-settings',
        component: () => import('../demo-pages/general/r-page-settings.vue'),
        meta: {
          title: 'Page Settings',
          alternativeTitles: ['Configuration', 'Mock'],
        },
      },
    ],
  },
  {
    path: '/sg-components',
    name: 'sg-components',
    component: sectionWrapper,
    meta: {
      title: 'Components',
    },
    children: [
      {
        path: 'test-navigation',
        name: 'test-navigation',
        component: () => import('../demo-pages/components/r-navigation.vue'),
        meta: {
          title: 'Navigation',
        },
      },
      {
        path: 'test-vas-modal',
        name: 'test-vas-modal',
        component: () => import('../demo-pages/components/r-vas-modal.vue'),
        meta: {
          title: 'Modal',
        },
      },
      {
        path: 'test-vas-demo-card',
        name: 'test-vas-demo-card',
        component: () => import('../demo-pages/components/r-vas-demo-card.vue'),
        meta: {
          title: 'Demo Card',
        },
      },
    ],
  },
  {
    path: '/sg-elements',
    name: 'sg-elements',
    component: sectionWrapper,
    meta: {
      title: 'Elements',
    },
    children: [
      {
        path: 'test-icons',
        name: 'test-icons',
        component: () => import('../demo-pages/elements/r-icon.vue'),
        meta: {
          title: 'Icons',
          alternativeTitles: ['Sprite', 'Icon finder'],
        },
      },
      {
        path: 'test-vas-toggle-button',
        name: 'test-vas-toggle-button',
        component: () => import('../demo-pages/elements/r-vas-toggle-button.vue'),
        meta: {
          title: 'Toggle Button',
        },
      },
      {
        path: 'test-vas-button',
        name: 'test-vas-button',
        component: () => import('../demo-pages/elements/r-button.vue'),
        meta: {
          title: 'Buttons',
        },
      },
      {
        path: 'test-vas-input',
        name: 'test-vas-input',
        component: () => import('../demo-pages/elements/r-vas-input.vue'),
        meta: {
          title: 'Input',
        },
      },
      {
        path: 'test-vas-checkbox',
        name: 'test-vas-checkbox',
        component: () => import('../demo-pages/elements/r-vas-checkbox.vue'),
        meta: {
          title: 'Checkbox',
        },
      },
      {
        path: 'test-vas-radio',
        name: 'test-vas-radio',
        component: () => import('../demo-pages/elements/r-vas-radio.vue'),
        meta: {
          title: 'Radio',
        },
      },
      {
        path: 'test-vas-progress',
        name: 'test-vas-progress',
        component: () => import('../demo-pages/elements/r-vas-progress.vue'),
        meta: {
          title: 'Progress',
        },
      },
      {
        path: 'test-vas-select',
        name: 'test-vas-select',
        component: () => import('../demo-pages/elements/r-vas-select.vue'),
        meta: {
          title: 'Select',
        },
      },
      {
        path: 'test-vas-toggle',
        name: 'test-vas-toggle',
        component: () => import('../demo-pages/elements/r-vas-toggle.vue'),
        meta: {
          title: 'Toggle',
        },
      },
      {
        path: 'test-vas-multiselect',
        name: 'test-vas-multiselect',
        component: () => import('../demo-pages/elements/r-vas-multiselect.vue'),
        meta: {
          title: 'Multiselect',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRoot,
  },
];
