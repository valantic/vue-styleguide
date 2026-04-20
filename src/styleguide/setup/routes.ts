import { styleguideTestPages } from '@/styleguide/setup/public-demo-routes';
import { styleguideRouterConfig } from '../../setup/globals';
import type { RouteMeta as StyleguideRouteMeta } from '../../types';

declare module 'vue-router' {
  interface RouteMeta extends StyleguideRouteMeta {
    [key: string]: unknown;
  }
}

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: styleguideRouterConfig.rootPath,
    name: 'sg-styleguide',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    redirect: '/sg/sg-test-page-readme',
    meta: {
      title: 'Styleguide',
      sortOrder: 1,
    },
    children: [
      styleguideTestPages.readme,
      {
        path: 'sg-test-page-typography',
        name: 'sg-test-page-typography',
        component: () => import('../demo-pages/general/r-typography.vue'),
        meta: {
          title: 'Typography',
          alternativeTitles: ['font'],
        },
      },
      {
        path: 'sg-test-page-settings',
        name: 'sg-test-page-settings',
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
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Components',
      sortOrder: 3,
    },
    children: [
      {
        path: 'sg-test-page-navigation',
        name: 'sg-test-page-navigation',
        component: () => import('../demo-pages/components/r-navigation.vue'),
        meta: {
          title: 'Navigation',
          sortOrder: 2,
        },
      },
      {
        path: 'sg-test-page-vas-modal',
        name: 'sg-test-page-vas-modal',
        component: () => import('../demo-pages/components/r-vas-modal.vue'),
        meta: {
          title: 'Modal',
          sortOrder: 1,
        },
      },
      {
        path: 'sg-test-page-vas-demo-card',
        name: 'sg-test-page-vas-demo-card',
        component: () => import('../demo-pages/components/r-vas-demo-card.vue'),
        meta: {
          title: 'Demo Card',
        },
      },
      {
        path: 'sg-test-page-vas-flyout',
        name: 'sg-test-page-vas-flyout',
        component: () => import('../demo-pages/components/r-vas-flyout.vue'),
        meta: {
          title: 'Flyout',
        },
      },
    ],
  },
  {
    path: '/sg-elements',
    name: 'sg-elements',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Elements',
      sortOrder: 2,
    },
    children: [
      {
        path: 'sg-test-page-icons',
        name: 'sg-test-page-icons',
        component: () => import('../demo-pages/elements/r-icon.vue'),
        meta: {
          title: 'Icons',
          alternativeTitles: ['Sprite', 'Icon finder'],
        },
      },
      {
        path: 'sg-test-page-vas-toggle-button',
        name: 'sg-test-page-vas-toggle-button',
        component: () => import('../demo-pages/elements/r-vas-toggle-button.vue'),
        meta: {
          title: 'Toggle Button',
        },
      },
      {
        path: 'sg-test-page-vas-button',
        name: 'sg-test-page-vas-button',
        component: () => import('../demo-pages/elements/r-button.vue'),
        meta: {
          title: 'Buttons',
        },
      },
      {
        path: 'sg-test-page-vas-input',
        name: 'sg-test-page-vas-input',
        component: () => import('../demo-pages/elements/r-vas-input.vue'),
        meta: {
          title: 'Input',
        },
      },
      {
        path: 'sg-test-page-vas-checkbox',
        name: 'sg-test-page-vas-checkbox',
        component: () => import('../demo-pages/elements/r-vas-checkbox.vue'),
        meta: {
          title: 'Checkbox',
        },
      },
      {
        path: 'sg-test-page-vas-radio',
        name: 'sg-test-page-vas-radio',
        component: () => import('../demo-pages/elements/r-vas-radio.vue'),
        meta: {
          title: 'Radio',
        },
      },
      {
        path: 'sg-test-page-vas-progress',
        name: 'sg-test-page-vas-progress',
        component: () => import('../demo-pages/elements/r-vas-progress.vue'),
        meta: {
          title: 'Progress',
        },
      },
      {
        path: 'sg-test-page-vas-select',
        name: 'sg-test-page-vas-select',
        component: () => import('../demo-pages/elements/r-vas-select.vue'),
        meta: {
          title: 'Select',
        },
      },
      {
        path: 'sg-test-page-vas-toggle',
        name: 'sg-test-page-vas-toggle',
        component: () => import('../demo-pages/elements/r-vas-toggle.vue'),
        meta: {
          title: 'Toggle',
        },
      },
      {
        path: 'sg-test-page-vas-multiselect',
        name: 'sg-test-page-vas-multiselect',
        component: () => import('../demo-pages/elements/r-vas-multiselect.vue'),
        meta: {
          title: 'Multiselect',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRouterConfig.rootPath,
  },
];
