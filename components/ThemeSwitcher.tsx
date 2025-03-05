"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themes = [
    { name: "Pink", value: "pink", bgClass: "bg-pink-500" },
    { name: "Indigo", value: "indigo", bgClass: "bg-indigo-500" },
    { name: "Emerald", value: "emerald", bgClass: "bg-emerald-500" },
    { name: "Amber", value: "amber", bgClass: "bg-amber-500" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
        aria-label="Change theme color"
      >
        <div className={`w-4 h-4 rounded-full ${themes.find((t) => t.value === themeColor)?.bgClass}`}></div>
        <span className="font-medium">Theme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">Select a theme</div>
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => {
                setThemeColor(theme.value as any);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm ${
                themeColor === theme.value ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${theme.bgClass}`}></div>
              {theme.name}
              {themeColor === theme.value && (
                <svg className="ml-auto h-4 w-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
