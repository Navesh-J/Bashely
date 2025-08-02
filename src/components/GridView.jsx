import React from 'react';
import { format, isSameMonth, isSameDay, isToday } from 'date-fns';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function GridView({ days, currentMonth, selectedDay, setSelectedDay, events }) {
  return (
    <div className="space-y-1">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center py-1">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-[2px]">
        {days.map(day => {
          const key = format(day, 'yyyy-MM-dd');
          const dayEvents = events[key] || [];
          const isInMonth = isSameMonth(day, currentMonth);
          const selected = selectedDay && isSameDay(day, selectedDay);

          return (
            <button
              key={key}
              onClick={() => setSelectedDay(day)}
              className={`p-1.5 h-20 text-xs rounded-md transition-all
                ${selected ? 'ring-2 ring-indigo-500' : ''}
                ${isToday(day) ? 'border border-indigo-500 shadow dark:shadow-md dark:border-indigo-400' : ''}
                ${
                  isInMonth
                    ? 'hover:bg-indigo-100 dark:hover:bg-indigo-800'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                }
              `}
            >
              <span
                className={`font-semibold
                  ${isToday(day) ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200'}
                `}
              >
                {format(day, 'd')}
              </span>

              <div className="flex flex-wrap mt-1 gap-0.5">
                {dayEvents.slice(0, 3).map(e => (
                  <span
                    key={e.id}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                  />
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[10px] dark:text-gray-300">
                    +{dayEvents.length - 3}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
