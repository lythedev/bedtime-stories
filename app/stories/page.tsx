import Image from "next/image";
import Link from "next/link";
import { getAllStories } from "@/lib/stories";
import { StoryCategory } from "@/types/story";

export default function StoriesPage() {
  const allStories = getAllStories();
  const categories: StoryCategory[] = ["fantasy", "adventure", "bedtime", "moral"];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">Explore Our Stories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a world of imagination with our collection of bedtime stories for children of all ages.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full">All Stories</button>
        {categories.map((category) => (
          <button
            key={category}
            className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allStories.map((story) => (
          <Link href={`/stories/${story.id}`} key={story.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl story-card">
              <div className="relative h-48 w-full">
                <Image src={story.coverImage} alt={story.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-indigo-800">{story.title}</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{story.category}</span>
                </div>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{story.ageRange}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{story.duration}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
