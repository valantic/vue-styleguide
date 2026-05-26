import { styleguideRouterConfig } from '../../setup/globals';
import { routes as componentsRoutes } from '../routes/components';
import { routes as designSystemRoutes } from '../routes/design-system';
import { routes as elementRoutes } from '../routes/elements';
import { routes as featuresRoutes } from '../routes/features';
import { routes as overviewRoutes } from '../routes/overview';

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: styleguideRouterConfig.rootPath,
    name: 'sg-styleguide',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    redirect: '/sg/overview/sg-project-overview',
    meta: {
      title: 'Styleguide',
      sortOrder: 1,
    },
    children: [],
  },
  ...overviewRoutes,
  ...componentsRoutes,
  ...elementRoutes,
  ...featuresRoutes,
  ...designSystemRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRouterConfig.rootPath,
  },
];
