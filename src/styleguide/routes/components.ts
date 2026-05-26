import { styleguideRouterConfig } from '../../setup/globals';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/components`,
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
          favorite: true,
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
        path: 'sg-test-page-vas-flyout',
        name: 'sg-test-page-vas-flyout',
        component: () => import('../demo-pages/components/r-vas-flyout.vue'),
        meta: {
          title: 'Flyout',
        },
      },
      {
        path: 'sg-test-page-vas-panel',
        name: 'sg-test-page-vas-panel',
        component: () => import('../demo-pages/components/r-vas-panel.vue'),
        meta: {
          title: 'Panel',
        },
      },
      {
        path: 'sg-test-page-vas-panel-action',
        name: 'sg-test-page-vas-panel-action',
        component: () => import('../demo-pages/components/r-vas-panel-action.vue'),
        meta: {
          title: 'Panel Action',
        },
      },
    ],
  },
];
