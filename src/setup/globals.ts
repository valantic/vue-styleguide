import type { StyleguideRouterConfig } from '../types';

export { BREAKPOINTS } from './breakpoints';
export type { ViewportBreakPoint } from './breakpoints';

export const styleguideRouterConfig: StyleguideRouterConfig = {
  rootPath: '/sg',
  routeChildrenComponentWrapper: {
    template: '<router-view />',
  },
};
