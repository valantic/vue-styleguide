import { reactive } from 'vue';

const state = reactive({
  /**
   * Indicates if the current page has a page config.
   */
  hasPageConfig: false,
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
  };
};

export type VasSessionStore = ReturnType<typeof useVasSessionStore>;
