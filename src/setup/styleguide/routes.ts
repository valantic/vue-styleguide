import { ComponentPublicInstance } from 'vue';
import index from '@/styleguide/demo-pages/r-index.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    params?: {
      [key: string]: string;
    };
    query?: {
      [key: string]: string;
    };
  }
}

export type Route = {
  path: string;
  name?: string;
  component?: ComponentPublicInstance | Record<string, unknown>;
  children?: Route[];
};

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
    children: [],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: root,
  },
];
