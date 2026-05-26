import type { RouteRecordRaw } from 'vue-router';

/**
 * Emits a console warning for every route whose meta does not satisfy the
 * RouteMeta contract. Runs only in DEV mode and only logs each offending route
 * once per session to avoid spamming the console on navigation.
 */
const warned = new Set<string>();

const warnOnce = (key: string, message: string): void => {
  if (warned.has(key)) {
    return;
  }

  warned.add(key);

  // eslint-disable-next-line no-console
  console.warn(`[c-vas-navigation] ${message}`);
};

const validateRoute = (route: RouteRecordRaw): void => {
  // Redirect-only routes (no component, no children) are infrastructure routes
  // and never appear in navigation — skip them entirely.
  if ('redirect' in route && !('component' in route) && !route.children?.length) {
    return;
  }

  const id = String(route.name ?? route.path);

  if (!route.meta) {
    warnOnce(id, `Route "${id}" has no meta object — "title" is required for navigation to work correctly.`);

    return;
  }

  if (typeof route.meta.title !== 'string' || !route.meta.title) {
    warnOnce(id, `Route "${id}" is missing a non-empty meta.title string.`);
  }

  if (route.meta.alternativeTitles !== undefined && !Array.isArray(route.meta.alternativeTitles)) {
    warnOnce(id, `Route "${id}" has meta.alternativeTitles that is not an array.`);
  }

  if (route.meta.sortOrder !== undefined && typeof route.meta.sortOrder !== 'number') {
    warnOnce(id, `Route "${id}" has meta.sortOrder that is not a number.`);
  }
};

export const validateRoutes = (routes: readonly RouteRecordRaw[]): void => {
  for (const route of routes) {
    validateRoute(route);

    if (route.children?.length) {
      validateRoutes(route.children);
    }
  }
};
