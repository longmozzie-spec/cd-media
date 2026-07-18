"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

const LIGHT = {
  "--color-background": "#F8F8FA",
  "--color-foreground": "#0F0F11",
  "--color-surface":    "#F0F0F4",
  "--color-card":       "#FFFFFF",
  "--color-border":     "#E4E4E7",
  "--color-muted":      "#6B7280",
};
const DARK = {
  "--color-background": "#0F0F11",
  "--color-foreground": "#FFFFFF",
  "--color-surface":    "#121214",
  "--color-card":       "#1A1A1E",
  "--color-border":     "#27272A",
  "--color-muted":      "#A1A1AA",
};

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  const vars = t === "light" ? LIGHT : DARK;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // On mount: read saved pref, apply immediately
  useEffect(() => {
    const saved = (localStorage.getItem("cdmedia-theme") as Theme) || "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("cdmedia-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
