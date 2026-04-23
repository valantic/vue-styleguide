import { reactive } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const state = reactive({
  /**
   * Indicates if the current page has a page config.
   */
  hasPageConfig: false,

  /**
   * The last 5 opened routes.
   */
  lastOpenedRoutes: [] as RouteRecordRaw[],
});

/**
 * A simple, encapsulated reactive store for session data.
 */
export const useVasSessionStore = () => {
  return {
    state,

    setHasPageConfig(value: boolean) {
      state.hasPageConfig = value;
    },

    addLastOpenedRoute(route: RouteRecordRaw) {
      if (!route.name || route.meta?.hideInStyleguide) {
        return;
      }

      const existingIndex = state.lastOpenedRoutes.findIndex((r) => r.name === route.name);

      if (existingIndex !== -1) {
        state.lastOpenedRoutes.splice(existingIndex, 1);
      }

      state.lastOpenedRoutes.unshift({
        ...route,
        children: [], // Clear children for the "Last Opened" group
      });

      if (state.lastOpenedRoutes.length > 5) {
        state.lastOpenedRoutes.pop();
      }
    },
  };
};

export type VasSessionStore = ReturnType<typeof useVasSessionStore>;
