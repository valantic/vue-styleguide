import { RouteMeta as StyleguideRouteMeta } from '../../types/route';
import index from '../demo-pages/r-index.vue';

declare module 'vue-router' {
  interface RouteMeta extends StyleguideRouteMeta {
    [key: string]: unknown;
  }
}

const root = '/styleguide';
const categoryWrapper = {
  template: '<router-view />',
};

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: root,
    name: 'index',
    component: index,
    meta: {
      title: 'Welcome',
    },
  },
  {
    path: `${root}/test`,
    name: 'test',
    redirect: `${root}/test`,
    component: categoryWrapper,
    meta: {
      title: 'test',
    },
    children: [
      {
        path: root,
        name: 'index',
        component: index,
        meta: {
          title: 'Welcome',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: root,
  },
];
