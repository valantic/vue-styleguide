import { styleguideRouterConfig } from '../../setup/globals';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/overview`,
    name: 'sg-overview',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Overview',
      sortOrder: 0,
    },
    children: [
      {
        path: 'sg-project-overview',
        name: 'sg-project-overview',
        component: () => import('../demo-pages/r-project-overview.vue'),
        meta: {
          title: 'About this Project',
        },
      },
    ],
  },
];
