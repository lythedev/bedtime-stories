import Image from "next/image";
import Link from "next/link";

// Sample story data (in a real app, this would come from a database or API)
const stories = [
  {
    id: "1",
    title: "The Sleepy Moon",
    description: "A tale about the moon who gets tired of staying up all night.",
    coverImage: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b",
    ageRange: "3-6 years",
    duration: "5 mins",
    category: "fantasy",
    content: `
      Once upon a time, high up in the night sky, there lived a beautiful, glowing Moon. Every night, the Moon would shine brightly, lighting up the darkness for all the creatures below.

      But the Moon had a secret. She was always very, very tired. While everyone else slept peacefully at night, the Moon had to stay awake, watching over the world.

      "Oh, how I wish I could sleep at night like everyone else," sighed the Moon one evening.

      The stars twinkled around her. "But Moon," they said, "who would light up the night if you were sleeping?"

      The Moon thought about this. It was true. Without her light, the night would be too dark.

      Just then, a little girl named Lily looked up at the sky from her bedroom window. She couldn't sleep.

      "Hello, Moon," whispered Lily. "Thank you for your beautiful light. It helps me not feel scared of the dark."

      The Moon smiled down at Lily. She realized that even though she was tired, her job was very important. She helped children like Lily feel safe at night.

      "I have an idea," said Lily. "I'll tell you a bedtime story to help you rest while you work."

      And so, Lily began telling the Moon a story about a magical garden where flowers sang lullabies. As Lily spoke, the Moon felt more relaxed than she had in centuries.

      From that night on, children all around the world would tell the Moon bedtime stories. And although the Moon still had to stay awake at night, listening to the children's stories made her feel peaceful and content.

      And sometimes, when there was a new moon and she was barely visible, the Moon would take a little nap, knowing that the stars would shine extra bright to keep everyone safe until she returned.

      The End.
    `,
  },
  {
    id: "2",
    title: "Adventures of Timmy the Turtle",
    description: "Follow Timmy as he discovers the wonders of the ocean.",
    coverImage: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
    ageRange: "4-8 years",
    duration: "8 mins",
    category: "adventure",
    content: `
      In a clear blue lagoon, surrounded by waving seaweed and colorful coral, lived a small turtle named Timmy. Timmy was different from the other turtles. While they were content to swim in the same part of the lagoon day after day, Timmy dreamed of exploring the vast ocean beyond.

      "Why do you want to leave our safe lagoon?" his mother would ask. "Everything we need is right here."

      But Timmy couldn't explain the feeling in his heart – a yearning to see what lay beyond the reef that surrounded their home.

      One morning, while everyone was still sleeping, Timmy decided it was time for his adventure. With a flutter of excitement, he swam toward the edge of the lagoon where the reef met the open ocean.

      As he approached the reef, he heard a friendly voice. "Where are you going, little turtle?" It was Ollie, the wise old octopus who knew all the secrets of the sea.

      "I want to explore the ocean," Timmy replied bravely.

      Ollie's eyes twinkled. "The ocean is beautiful but full of challenges. Would you like a guide for your journey?"

      Timmy nodded eagerly, and together they set off beyond the reef.

      Their adventure took them through forests of tall seaweed, past schools of shimmering fish, and alongside magnificent whales that sang songs as deep as the ocean itself.

      They discovered hidden caves filled with sparkling treasures, danced with playful dolphins, and helped a lost baby seahorse find its family.

      Along the way, Timmy learned to be brave when faced with swift currents, to be kind to creatures both large and small, and to appreciate the wonders of the ocean world.

      When they finally returned to the lagoon, Timmy's family was waiting anxiously. "Oh, Timmy! We were so worried," his mother exclaimed.

      Timmy told them about everything he had seen and learned. His stories were so exciting that soon, other young turtles wanted to explore too.

      From that day on, Timmy became known as Timmy the Explorer, and he taught others how to safely discover the wonders of the ocean while always remembering the way back home.

      The End.
    `,
  },
  // Add more stories with their content here
];

export default function StoryPage({ params }: { params: { id: string } }) {
  // Find the story that matches the ID from the URL
  const story = stories.find((s) => s.id === params.id);

  // Handle case where story is not found
  if (!story) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-500">Story not found</h1>
        <p className="mt-4">We couldn't find the story you're looking for.</p>
        <Link href="/stories" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full">
          Back to Stories
        </Link>
      </div>
    );
  }

  // Format the story content with proper paragraphs
  const formattedContent = story.content
    .trim()
    .split("\n\n")
    .map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph.trim()}
      </p>
    ));

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
            <button className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-indigo-200">
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

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories
            .filter((s) => s.id !== params.id)
            .slice(0, 3)
            .map((relatedStory) => (
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
    </div>
  );
}
