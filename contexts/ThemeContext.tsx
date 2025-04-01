"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeOption = "Retro" | "Modern";

interface ThemeContextType {
  currentTheme: ThemeOption;
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "Retro",
  toggleTheme: () => {},
});

// Check if code is running on client side
const isClient = typeof window !== "undefined";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default theme
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>("Retro");
  const [isInitialized, setIsInitialized] = useState(false);

  // Run only once on client-side after mount
  useEffect(() => {
    if (isClient) {
      const storedTheme = localStorage.getItem("hackrpi-theme") as ThemeOption;
      if (storedTheme && (storedTheme === "Retro" || storedTheme === "Modern")) {
        setCurrentTheme(storedTheme);
      }
      setIsInitialized(true);
    }
  }, []);

  // Apply theme change to DOM and localStorage
  useEffect(() => {
    if (isClient && isInitialized) {
      localStorage.setItem("hackrpi-theme", currentTheme);
      document.documentElement.setAttribute("data-theme", currentTheme.toLowerCase());
    }
  }, [currentTheme, isInitialized]);

  // Toggle between themes
  const toggleTheme = () => {
    setCurrentTheme(prev => prev === "Retro" ? "Modern" : "Retro");
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  return useContext(ThemeContext);
}