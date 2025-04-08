"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeOption = "Retro" | "Modern";

interface ThemeContextType {
  currentTheme: ThemeOption;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "Retro",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>("Retro");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedTheme = localStorage.getItem("hackrpi-theme") as ThemeOption;
      if (storedTheme && (storedTheme === "Retro" || storedTheme === "Modern")) {
        setCurrentTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme.toLowerCase());
      } else {
        localStorage.setItem("hackrpi-theme", "Retro");
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("hackrpi-theme", currentTheme);
      document.documentElement.setAttribute("data-theme", currentTheme.toLowerCase());
    }
  }, [currentTheme, mounted]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === "Retro" ? "Modern" : "Retro");
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}