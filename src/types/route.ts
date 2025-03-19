import { ComponentPublicInstance } from 'vue';

export type RouteMeta = {
  title: string;
  params?: {
    [key: string]: string;
  };
  query?: {
    [key: string]: string;
  };
};

export type Route = {
  path: string;
  name?: string;
  component?: ComponentPublicInstance | Record<string, unknown>;
  children?: Route[];
};
