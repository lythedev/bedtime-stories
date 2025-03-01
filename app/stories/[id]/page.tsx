"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getStoryById, getRelatedStories } from "@/lib/stories";
import { isStoryFavorite, toggleFavorite } from "@/lib/favorites";
import { notFound } from "next/navigation";

export default function StoryPage({ params }: { params: { id: string } }) {
  const story = getStoryById(params.id);
  const [isFavorite, setIsFavorite] = useState(false);

  // Handle case where story is not found
  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(params.id);

  // Initialize favorite state
  useEffect(() => {
    setIsFavorite(isStoryFavorite(params.id));
  }, [params.id]);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    const newFavoriteState = toggleFavorite(params.id);
    setIsFavorite(newFavoriteState);
  };

  // Format the story content with proper paragraphs
  const formattedContent = story.content
    ? story.content
        .trim()
        .split("\n\n")
        .map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph.trim()}
          </p>
        ))
    : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/stories" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
          ← Back to All Stories
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 w-full">
          <Image src={story.coverImage} alt={story.title} fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-indigo-800">{story.title}</h1>
            <div className="flex gap-2">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{story.ageRange}</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{story.duration}</span>
            </div>
          </div>

          <p className="text-gray-700 italic mb-6">{story.description}</p>

          <div className="prose max-w-none text-gray-800 leading-relaxed">{formattedContent}</div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                isFavorite
                  ? "bg-pink-100 text-pink-800 hover:bg-pink-200"
                  : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
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

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-indigo-700">
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
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              Read Aloud
            </button>
          </div>
        </div>
      </div>

      {relatedStories.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map((relatedStory) => (
              <Link href={`/stories/${relatedStory.id}`} key={relatedStory.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl story-card">
                  <div className="relative h-40 w-full">
                    <Image src={relatedStory.coverImage} alt={relatedStory.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-indigo-800 mb-1">{relatedStory.title}</h3>
                    <div className="flex justify-between text-xs">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {relatedStory.ageRange}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{relatedStory.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
