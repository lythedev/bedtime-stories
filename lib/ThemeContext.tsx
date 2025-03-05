"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeColor = "pink" | "indigo" | "emerald" | "amber";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with pink theme, but check localStorage on client
  const [themeColor, setThemeColor] = useState<ThemeColor>("pink");
  const [mounted, setMounted] = useState(false);

  // On mount, check if there's a saved theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("themeColor") as ThemeColor;
    if (savedTheme && ["pink", "indigo", "emerald", "amber"].includes(savedTheme)) {
      setThemeColor(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // When theme changes, save to localStorage
  const handleThemeChange = (color: ThemeColor) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
    document.documentElement.setAttribute("data-theme", color);
  };

  // Only render children when mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: handleThemeChange }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
