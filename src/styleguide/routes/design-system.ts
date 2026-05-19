import { styleguideRouterConfig } from '../../setup/globals';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/elements`,
    name: 'sg-design',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Design',
      sortOrder: 1,
    },
    children: [
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
        path: 'sg-test-page-theme-preview',
        name: 'sg-test-page-theme-preview',
        component: () => import('../demo-pages/general/r-theme-preview.vue'),
        meta: {
          title: 'Theme Preview',
          alternativeTitles: ['Dark mode', 'Light mode', 'Colors'],
        },
      },
    ],
  },
];
