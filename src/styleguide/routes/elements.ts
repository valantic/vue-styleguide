import { styleguideRouterConfig } from '../../setup/globals';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/elements`,
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
];
