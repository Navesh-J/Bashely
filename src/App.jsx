import { ThemeProvider } from './hooks/useTheme';
import { CalendarAppContent } from './CalendarAppContent';

export default function App() {
  return (
    <ThemeProvider>
      <CalendarAppContent />
    </ThemeProvider>
  );
}
