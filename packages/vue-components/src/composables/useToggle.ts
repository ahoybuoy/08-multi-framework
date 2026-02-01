import { ref, Ref } from 'vue';

/**
 * A composable for managing boolean toggle state
 * Vue-specific implementation using Composition API
 *
 * Note: This is the Vue equivalent of React's useToggle hook
 */
export function useToggle(initialValue = false): {
  value: Ref<boolean>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (newValue: boolean) => void;
} {
  const value = ref(initialValue);

  function toggle() {
    value.value = !value.value;
  }

  function setTrue() {
    value.value = true;
  }

  function setFalse() {
    value.value = false;
  }

  function setValue(newValue: boolean) {
    value.value = newValue;
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
}

export default useToggle;
