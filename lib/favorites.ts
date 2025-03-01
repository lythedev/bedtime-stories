import { Story } from "@/types/story";
import { getStoryById } from "./stories";

// Key for localStorage
const FAVORITES_KEY = "bedtime_story_favorites";

// Get all favorite story IDs from localStorage
export function getFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];

  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

// Get all favorite stories with full data
export function getFavoriteStories(): (Story & { dateAdded: string })[] {
  const favoriteIds = getFavoriteIds();

  return favoriteIds
    .map((id) => {
      const story = getStoryById(id);
      if (!story) return null;

      // Add dateAdded property
      return {
        ...story,
        dateAdded: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    })
    .filter((story): story is Story & { dateAdded: string } => story !== null);
}

// Check if a story is in favorites
export function isStoryFavorite(storyId: string): boolean {
  return getFavoriteIds().includes(storyId);
}

// Toggle a story in favorites (add if not present, remove if present)
export function toggleFavorite(storyId: string): boolean {
  if (typeof window === "undefined") return false;

  const favorites = getFavoriteIds();
  const isFavorite = favorites.includes(storyId);

  let newFavorites: string[];
  if (isFavorite) {
    // Remove from favorites
    newFavorites = favorites.filter((id) => id !== storyId);
  } else {
    // Add to favorites
    newFavorites = [...favorites, storyId];
  }

  // Save to localStorage
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));

  // Return new state (true if added, false if removed)
  return !isFavorite;
}
