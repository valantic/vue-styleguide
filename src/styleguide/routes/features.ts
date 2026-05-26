import { styleguideRouterConfig } from '../../setup/globals';
import { styleguideTestPages } from '../setup/public-demo-routes';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/features`,
    name: 'sg-features',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Features',
      sortOrder: 1,
    },
    children: [
      styleguideTestPages.readme,
      {
        path: 'sg-test-page-settings',
        name: 'sg-test-page-settings',
        component: () => import('../demo-pages/general/r-page-settings.vue'),
        meta: {
          title: 'Page Settings',
          alternativeTitles: ['Configuration', 'Mock'],
        },
      },
      {
        path: 'sg-test-page-settings-persistent',
        name: 'sg-test-page-settings-persistent',
        component: () => import('../demo-pages/general/r-page-settings-persistent.vue'),
        meta: {
          title: 'Page Settings Persistent',
          alternativeTitles: ['Configuration', 'Mock', 'Persistence'],
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
