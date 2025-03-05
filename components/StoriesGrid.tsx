"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Story, StoryCategory } from "@/types/story";
import { getAllStoriesAsync } from "@/lib/stories";

interface StoriesGridProps {
  initialStories: Story[];
  categories: StoryCategory[];
}

export default function StoriesGrid({ initialStories, categories }: StoriesGridProps) {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [activeFilter, setActiveFilter] = useState<StoryCategory | "all">("all");
  const [loading, setLoading] = useState(initialStories.length === 0);

  // If initialStories is empty, fetch stories from Supabase
  useEffect(() => {
    if (initialStories.length === 0) {
      const fetchStories = async () => {
        setLoading(true);
        try {
          const fetchedStories = await getAllStoriesAsync();
          setStories(fetchedStories);
        } catch (error) {
          console.error("Error fetching stories:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStories();
    }
  }, [initialStories]);

  // Filter stories based on the active filter
  const filteredStories = activeFilter === "all" ? stories : stories.filter((story) => story.category === activeFilter);

  return (
    <>
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-full transition-colors ${
            activeFilter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          }`}
        >
          All Stories
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeFilter === category
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading stories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <Link href={`/stories/${story.id}`} key={story.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl story-card">
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
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No stories found in this category.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
