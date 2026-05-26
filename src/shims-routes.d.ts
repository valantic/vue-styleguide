import 'vue-router';
import type { RouteMeta as StyleguideRouteMeta } from './types';

declare module 'vue-router' {
  interface RouteMeta extends StyleguideRouteMeta {
    [key: string]: unknown;
  }
}
