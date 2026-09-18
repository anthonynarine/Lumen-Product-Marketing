"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "lumen-theme";
const THEME_EVENT = "lumen-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage may be unavailable (private browsing); theme still applies for this load.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === "light"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-foreground-muted transition-colors hover:border-foreground/40 hover:text-foreground ${className}`}
    >
      {theme === "dark" ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M12 3a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 14.5a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1ZM3 12a1 1 0 0 1 1-1h1.5a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm14.5 0a1 1 0 0 1 1-1H20a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1ZM5.64 5.64a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 1 1-1.41 1.41L5.64 7.05a1 1 0 0 1 0-1.41Zm10.25 10.25a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 0 1-1.41 1.41l-1.06-1.06a1 1 0 0 1 0-1.41ZM18.36 5.64a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 1 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0ZM8.11 15.89a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 1 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M20.354 15.354A9 9 0 0 1 8.646 3.646a9.003 9.003 0 1 0 11.708 11.708Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
