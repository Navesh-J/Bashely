import React from "react";
import { useTheme } from "../hooks/useTheme";

export function Header({ mode, setMode }) {
  const { theme, toggle } = useTheme();

  return (
    <header className="flex justify-between sticky top-0 z-10 items-center p-4 border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Bashely
      </h1>

      <div className="flex space-x-2">
        <button
          onClick={() => setMode((m) => (m === "grid" ? "list" : "grid"))}
          className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {mode === "grid" ? "List View" : "Grid View"}
        </button>

        <button
          onClick={toggle}
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-indigo-600 hover:text-white transition"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
}
