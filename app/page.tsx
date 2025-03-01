import Image from "next/image";
import Link from "next/link";

// Sample story data for the homepage
const featuredStories = [
  {
    id: 1,
    title: "The Sleepy Moon",
    description: "A tale about the moon who gets tired of staying up all night.",
    coverImage: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b",
    ageRange: "3-6 years",
    duration: "5 mins",
  },
  {
    id: 2,
    title: "Adventures of Timmy the Turtle",
    description: "Follow Timmy as he discovers the wonders of the ocean.",
    coverImage: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
    ageRange: "4-8 years",
    duration: "8 mins",
  },
  {
    id: 3,
    title: "The Magic Forest",
    description: "A story about a forest where the trees can talk and animals can fly.",
    coverImage: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    ageRange: "5-9 years",
    duration: "10 mins",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-indigo-800">Magical Bedtime Stories</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Help your children fall asleep with enchanting stories that spark imagination and teach valuable lessons.
        </p>
        <Link
          href="/stories"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Explore Stories
        </Link>
      </section>

      {/* Featured Stories Section */}
      <section>
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Featured Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((story) => (
            <Link href={`/stories/${story.id}`} key={story.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl story-card">
                <div className="relative h-48 w-full">
                  <Image src={story.coverImage} alt={story.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-800 mb-2">{story.title}</h3>
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
      </section>

      {/* Benefits Section */}
      <section className="bg-indigo-50 p-8 rounded-xl">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">Why Bedtime Stories Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">Boosts Imagination</h3>
            <p className="text-gray-600">
              Stories transport children to magical worlds, fostering creativity and imagination.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">Improves Language</h3>
            <p className="text-gray-600">Regular reading exposes children to rich vocabulary and language patterns.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">Creates Bonding</h3>
            <p className="text-gray-600">
              Reading together creates special moments and strengthens parent-child relationships.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
