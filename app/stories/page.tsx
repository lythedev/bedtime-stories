import Image from "next/image";
import Link from "next/link";
import { getAllStoriesAsync } from "@/lib/stories";
import { StoryCategory } from "@/types/story";
import StoriesGrid from "../../components/StoriesGrid";

export const dynamic = "force-dynamic"; // Don't cache this page

export default async function StoriesPage() {
  // Fetch stories from both local data and Supabase
  const allStories = await getAllStoriesAsync();
  const categories: StoryCategory[] = ["fantasy", "adventure", "bedtime", "moral"];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">Explore Our Stories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a world of imagination with our collection of bedtime stories for children of all ages.
        </p>
        <Link
          href="/stories/create"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Create Your Own Story
        </Link>
      </div>

      {/* Client-side filtering will be handled by the StoriesGrid component */}
      <StoriesGrid initialStories={allStories} categories={categories} />
    </div>
  );
}
