import { format } from 'date-fns';
import { useCallback } from 'react';
import { usePersistentState } from './usePersistentState';

export function useEventManager() {
  const [events, setEvents] = usePersistentState('calendarAppEvents', {});

  const addEvent = useCallback((date, time, title) => {
    const key = format(date, 'yyyy-MM-dd');
    const event = { id: Date.now(), time, title };
    setEvents(prev => {
      const dayEvents = prev[key] || [];
      return {
        ...prev,
        [key]: [...dayEvents, event].sort((a, b) => a.time.localeCompare(b.time)),
      };
    });
  }, [setEvents]);

  const removeEvent = useCallback((date, id) => {
    const key = format(date, 'yyyy-MM-dd');
    setEvents(prev => ({
      ...prev,
      [key]: (prev[key] || []).filter(e => e.id !== id),
    }));
  }, [setEvents]);


  return { events, addEvent, removeEvent };
}
