export const styleguideTestPages = {
  readme: {
    path: 'sg-test-page-readme',
    name: 'sg-test-page-readme',
    component: () => import('../demo-pages/r-readme.vue'),
    meta: {
      title: 'Readme',
      file: '/README.md',
    },
  },
  typography: {
    path: 'sg-test-page-typography',
    name: 'sg-test-page-typography',
    component: () => import('../demo-pages/general/r-typography.vue'),
    meta: {
      title: 'Typography',
      alternativeTitles: ['font'],
    },
  },
  icons: {
    path: 'sg-test-page-icons',
    name: 'sg-test-page-icons',
    component: () => import('../demo-pages/elements/r-icon.vue'),
    meta: {
      title: 'Icons',
      alternativeTitles: ['Sprite', 'Icon finder'],
    },
  },
};
