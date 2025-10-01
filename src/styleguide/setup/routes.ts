import { RouteMeta as StyleguideRouteMeta } from '../../types/route';
import rElements from '../demo-pages/r-elements.vue';
import rReadme from '../demo-pages/r-readme.vue';

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
    redirect: `${styleguideRoot}/readme`,
    component: sectionWrapper,
    meta: {
      title: 'Styleguide',
    },
    children: [
      {
        path: 'readme',
        name: 'Readme',
        component: rReadme,
        meta: {
          title: 'Readme',
        },
      },
      {
        path: 'elements',
        name: 'Elements',
        component: rElements,
        meta: {
          title: 'Elements',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRoot,
  },
];
