import React, { useState } from 'react';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format
} from 'date-fns';
import { useTheme } from './hooks/useTheme';
import { useEventManager } from './hooks/useEventManager';
import { Header } from './components/Header';
import { GridView } from './components/GridView';
import { ListView } from './components/ListView';
import { EventSidebar } from './components/EventSidebar';

export function CalendarAppContent() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [mode, setMode] = useState('grid');

  const { theme, toggle: toggleTheme } = useTheme();
  const { events, addEvent, removeEvent } = useEventManager();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const gridDays = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const listDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header mode={mode} setMode={setMode}>
        <button
          onClick={toggleTheme}
          className="ml-auto px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-sm"
        >
          {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </Header>

      <main className="flex flex-1 overflow-hidden">
        <section className="w-2/3 p-6  border-r border-gray-200 dark:border-gray-700">
          <div className="sticky top-0 bg-white dark:bg-gray-900 pb-2 z-10">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                &lt;
              </button>
              <h2 className="text-3xl font-bold">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                &gt;
              </button>
            </div>
          </div>

          {mode === 'grid' ? (
            <GridView
              days={gridDays}
              currentMonth={currentMonth}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              events={events}
            />
          ) : (
            <ListView
              days={listDays}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              events={events}
            />
          )}
        </section>

        <EventSidebar
          selectedDay={selectedDay}
          events={events}
          addEvent={addEvent}
          removeEvent={removeEvent}
          onClose={() => setSelectedDay(null)}
        />
      </main>
    </div>
  );
}
