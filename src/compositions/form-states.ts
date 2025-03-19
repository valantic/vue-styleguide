import { computed, ComputedRef, PropType, Ref, ref } from 'vue';

export enum FieldState {
  Default = 'default',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

type StateModifiers = {
  state: FieldState;
  active: boolean;
  focus: boolean;
  hover: boolean;
};

export type FormStates = {
  active: Ref<boolean>;
  focus: Ref<boolean>;
  hover: Ref<boolean>;
  stateModifiers: ComputedRef<StateModifiers>;
  hasDefaultState: ComputedRef<boolean>;
};

// eslint-disable-next-line -- TODO: did not know how to fix the return type so it is valid on component side.
export const withProps = () => ({
  /**
   * Form states for class names (default, error, success, warning, info)
   */
  state: {
    type: String as PropType<FieldState>,
    default: 'default',
    validator: (value: string): boolean => ['error', 'success', 'warning', 'info', 'default'].includes(value),
  },
});

/**
 * Defines the reactive properties which can be used for form elements
 */
const formStates = (inputState: Ref<FieldState>): FormStates => {
  const active = ref<boolean>(false);
  const focus = ref<boolean>(false);
  const hover = ref<boolean>(false);

  /**
   * Holds an object with several modifiers of the form element.
   */
  const stateModifiers: ComputedRef<StateModifiers> = computed(() => ({
    state: inputState.value,
    active: active.value,
    focus: focus.value,
    hover: hover.value,
  }));

  /**
   * Holds a boolean if the form element has default state.
   */
  const hasDefaultState: ComputedRef<boolean> = computed(() => inputState.value === FieldState.Default);

  return {
    // data
    active,
    focus,
    hover,

    // computed
    stateModifiers,
    hasDefaultState,
  };
};

export default formStates;
