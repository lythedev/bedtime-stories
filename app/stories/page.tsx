import Image from "next/image";
import Link from "next/link";

// Sample story data
const allStories = [
  {
    id: 1,
    title: "The Sleepy Moon",
    description: "A tale about the moon who gets tired of staying up all night.",
    coverImage: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b",
    ageRange: "3-6 years",
    duration: "5 mins",
    category: "fantasy",
  },
  {
    id: 2,
    title: "Adventures of Timmy the Turtle",
    description: "Follow Timmy as he discovers the wonders of the ocean.",
    coverImage: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
    ageRange: "4-8 years",
    duration: "8 mins",
    category: "adventure",
  },
  {
    id: 3,
    title: "The Magic Forest",
    description: "A story about a forest where the trees can talk and animals can fly.",
    coverImage: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    ageRange: "5-9 years",
    duration: "10 mins",
    category: "fantasy",
  },
  {
    id: 4,
    title: "The Brave Little Boat",
    description: "A little boat dreams of sailing across the ocean despite being small.",
    coverImage: "https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7",
    ageRange: "3-7 years",
    duration: "7 mins",
    category: "adventure",
  },
  {
    id: 5,
    title: "Stars that Sing",
    description: "Every night, the stars come out to sing lullabies to the children of Earth.",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    ageRange: "2-5 years",
    duration: "5 mins",
    category: "bedtime",
  },
  {
    id: 6,
    title: "The Helpful Cloud",
    description: "A cloud that travels the world helping those in need with its magical rain.",
    coverImage: "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf",
    ageRange: "4-8 years",
    duration: "8 mins",
    category: "moral",
  },
];

export default function StoriesPage() {
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
        <button className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50">
          Fantasy
        </button>
        <button className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50">
          Adventure
        </button>
        <button className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50">
          Bedtime
        </button>
        <button className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50">
          Moral
        </button>
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
