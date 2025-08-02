import { useState, useEffect } from 'react';

export function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    // Debounced write
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch {}
    }, 300);
    return () => clearTimeout(handle);
  }, [key, state]);

  return [state, setState];
}
