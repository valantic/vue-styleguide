import { RouteMeta as StyleguideRouteMeta } from '../../types/route';

declare module 'vue-router' {
  interface RouteMeta extends StyleguideRouteMeta {
    [key: string]: unknown;
  }
}

export const styleguideRoot = '/styleguide';
export const sectionWrapper = {
  template: '<router-view />',
};

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: styleguideRoot,
    name: 'styleguide',
    component: sectionWrapper,
    meta: {
      title: 'Styleguide',
    },
    children: [
      {
        path: 'readme',
        name: 'Readme',
        component: () => import('../demo-pages/r-readme.vue'),
        meta: {
          title: 'Readme',
        },
      },
      {
        path: 'typography',
        name: 'typography',
        component: () => import('../demo-pages/general/r-typography.vue'),
        meta: {
          title: 'Typography',
          alternativeTitles: ['font'],
        },
      },
    ],
  },
  {
    path: '/components',
    name: 'components',
    component: sectionWrapper,
    meta: {
      title: 'Components',
    },
    children: [
      {
        path: 'navigation',
        name: 'Navigation',
        component: () => import('../demo-pages/components/r-navigation.vue'),
        meta: {
          title: 'Navigation',
        },
      },
    ],
  },
  {
    path: '/elements',
    name: 'elements',
    component: sectionWrapper,
    meta: {
      title: 'Elements',
    },
    children: [
      {
        path: 'elements',
        name: 'Elements',
        component: () => import('../demo-pages/elements/r-elements.vue'),
        meta: {
          title: 'Elements',
          alternativeTitles: ['Elemente', 'Elementos'],
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRoot,
  },
];
