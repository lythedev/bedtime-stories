"use client";

import { useState, useEffect } from "react";
import { isStoryFavorite, toggleFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  storyId: string;
}

export default function FavoriteButton({ storyId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize favorite state
  useEffect(() => {
    setIsClient(true);
    setIsFavorite(isStoryFavorite(storyId));
  }, [storyId]);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    const newFavoriteState = toggleFavorite(storyId);
    setIsFavorite(newFavoriteState);
  };

  if (!isClient) {
    return (
      <button className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full flex items-center gap-2">
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
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
        Add to Favorites
      </button>
    );
  }

  return (
    <button
      onClick={handleFavoriteToggle}
      className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
        isFavorite
          ? "bg-primary-100 text-primary-800 hover:bg-primary-200"
          : "bg-primary-100 text-primary-800 hover:bg-primary-200"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      </svg>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
