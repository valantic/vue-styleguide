import { reactive } from 'vue';

const state = reactive({
  // This is an example property.
  example: false,
});

export const useVasBlueprintStore = () => {
  return {
    state,
  };
};

export type VasBlueprintStore = ReturnType<typeof useVasBlueprintStore>;
