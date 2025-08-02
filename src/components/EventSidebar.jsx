import React, { useState } from 'react';
import { format } from 'date-fns';

export function EventSidebar({ selectedDay, events, addEvent, removeEvent,onClose}) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const key = selectedDay && format(selectedDay, 'yyyy-MM-dd');
  const dayEvents = events[key] || [];

  const submit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    addEvent(selectedDay, time, title.trim());
    setTitle('');
  };

  return (
    <aside
      className={`w-1/3 p-6 bg-indigo-50 dark:bg-teal-950 shadow-lg transition-transform ${
        selectedDay ? 'translate-x-0' : 'translate-x-full pointer-events-none'
      }`}
    >
      {selectedDay ? (
        <>
          <header className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {format(selectedDay, 'EEEE, do MMMM yyyy')}
            </h3>
            <button onClick={onClose}>×</button>
          </header>
          <ul className="space-y-3 mb-6">
            {dayEvents.map(e => (
              <li
                key={e.id}
                className="flex justify-between items-center p-3 bg-white dark:bg-indigo-800 rounded"
              >
                <div>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm">{e.time}</p>
                </div>
                <button onClick={() => removeEvent(selectedDay, e.id)}>🗑</button>
              </li>
            ))}
            {dayEvents.length === 0 && <p className="italic">No events for this day.</p>}
          </ul>
          <form onSubmit={submit} className="space-y-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="w-full border px-3 py-2 rounded dark:bg-slate-700"
            />
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded dark:bg-slate-700"
            />
            <button type="submit" className="w-full py-2 rounded bg-indigo-600 text-white">
              Add Event
            </button>
          </form>
        </>
      ) : (
        <p>Select a date to view or add events.</p>
      )}
    </aside>
  );
}
