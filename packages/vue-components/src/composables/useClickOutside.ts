import { ref, onMounted, onUnmounted, Ref } from 'vue';

/**
 * A composable that detects clicks outside of an element
 * Vue-specific implementation using Composition API
 *
 * Note: This is the Vue equivalent of React's useClickOutside hook
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): Ref<T | null> {
  const elementRef = ref<T | null>(null);

  function handleClickOutside(event: MouseEvent) {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback();
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return elementRef as Ref<T | null>;
}

export default useClickOutside;
