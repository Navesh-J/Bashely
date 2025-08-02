import React from 'react';
import { format, isSameDay } from 'date-fns';

export function ListView({ days, selectedDay, setSelectedDay, events }) {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-auto max-h-[600px]">
      {days.map(day => {
        const key = format(day, 'yyyy-MM-dd');
        const dayEvents = events[key] || [];
        const selected = selectedDay && isSameDay(day, selectedDay);

        return (
          <li
            key={key}
            onClick={() => setSelectedDay(day)}
            className={`flex justify-between items-start p-4 cursor-pointer transition-colors
              ${selected ? 'bg-indigo-100 dark:bg-indigo-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
            `}
          >
            <span className="w-28 font-semibold text-gray-800 dark:text-gray-100">
              {format(day, 'do MMM')}
            </span>
            <div className="flex-1 text-sm space-y-1 text-gray-700 dark:text-gray-300">
              {dayEvents.length === 0 ? (
                <span className="italic text-gray-400 dark:text-gray-500">No events</span>
              ) : (
                dayEvents.map(e => (
                  <div key={e.id} className="flex items-center justify-between">
                    <span>{e.time}</span>
                    <span className="ml-2 truncate">{e.title}</span>
                  </div>
                ))
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
