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
        path: 'test-elements',
        name: 'test-elements',
        component: () => import('../demo-pages/elements/r-elements.vue'),
        meta: {
          title: 'Elements',
          alternativeTitles: ['Elemente', 'Elementos'],
        },
      },
      {
        path: 'test-icons',
        name: 'test-icons',
        component: () => import('../demo-pages/elements/r-icon.vue'),
        meta: {
          title: 'Icons',
          alternativeTitles: ['Sprite', 'Icon finder'],
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRoot,
  },
];
