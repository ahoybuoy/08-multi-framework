import { useEffect, useRef, RefObject } from 'react';

/**
 * A hook that detects clicks outside of a ref element
 * React-specific implementation
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  enabled = true
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback, enabled]);

  return ref;
}

export default useClickOutside;
