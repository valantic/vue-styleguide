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
        path: 'sg-test-page-concept',
        name: 'sg-test-page-concept',
        component: () => import('../demo-pages/general/r-concept.vue'),
        meta: {
          title: 'Concept',
          sortOrder: 0,
          alternativeTitles: ['Overview', 'Design principles', 'Architecture'],
        },
      },
      {
        path: 'sg-test-page-color-palette',
        name: 'sg-test-page-color-palette',
        component: () => import('../demo-pages/general/r-color-palette.vue'),
        meta: {
          title: 'Color Palette',
          alternativeTitles: ['Colors', 'Tokens', 'Swatches'],
        },
      },
      {
        path: 'sg-test-page-spacing-scale',
        name: 'sg-test-page-spacing-scale',
        component: () => import('../demo-pages/general/r-spacing-scale.vue'),
        meta: {
          title: 'Spacing Scale',
          alternativeTitles: ['Spacing', 'Margins', 'Padding'],
        },
      },
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
