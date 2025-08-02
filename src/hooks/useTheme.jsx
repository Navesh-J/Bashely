import React, { createContext, useContext } from 'react';
import { usePersistentState } from './usePersistentState';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = usePersistentState('calendarAppTheme', 'light');

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const [theme, setTheme] = useContext(ThemeContext);
  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return { theme, toggle };
}
