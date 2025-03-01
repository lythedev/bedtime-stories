"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFavoriteStories, toggleFavorite } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favoriteStories, setFavoriteStories] = useState<ReturnType<typeof getFavoriteStories>>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize favorites from localStorage
  useEffect(() => {
    setIsClient(true);
    setFavoriteStories(getFavoriteStories());
  }, []);

  // Handle removing a story from favorites
  const handleRemoveFavorite = (storyId: string) => {
    toggleFavorite(storyId);
    setFavoriteStories(getFavoriteStories());
  };

  // Only show content after client-side hydration to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading favorites...</p>
      </div>
    );
  }

  const hasFavorites = favoriteStories.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">Your Favorite Stories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {hasFavorites
            ? "Here are the stories you've saved for easy access."
            : "You haven't added any stories to your favorites yet."}
        </p>
      </div>

      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl story-card relative"
            >
              <button
                onClick={() => handleRemoveFavorite(story.id)}
                className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50"
                aria-label="Remove from favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="red"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
              <Link href={`/stories/${story.id}`}>
                <div className="relative h-48 w-full">
                  <Image src={story.coverImage} alt={story.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-indigo-800">{story.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {story.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{story.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{story.ageRange}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{story.duration}</span>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">Added on {story.dateAdded}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-indigo-50 rounded-lg">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-indigo-400"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">No Favorites Yet</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Explore our collection and add your favorite stories to this list for quick access anytime.
          </p>
          <Link
            href="/stories"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Find Stories to Love
          </Link>
        </div>
      )}
    </div>
  );
}
