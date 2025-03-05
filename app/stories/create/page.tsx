"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { StoryCategory } from "@/types/story";

export default function CreateStoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const categories: StoryCategory[] = ["fantasy", "adventure", "bedtime", "moral"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setDebugInfo(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as string;
    const ageRange = formData.get("ageRange") as string;
    const duration = formData.get("duration") as string;
    const category = formData.get("category") as StoryCategory;

    try {
      // For demo purposes, we'll use a placeholder image if none provided
      const finalCoverImage = coverImage || "https://images.unsplash.com/photo-1532667449560-72a95c8d381b";

      setDebugInfo(`Submitting to Supabase: ${title}, ${category}`);

      // Insert the story into Supabase
      const { data, error: insertError } = await supabase
        .from("stories")
        .insert([
          {
            title,
            description,
            content,
            cover_image: finalCoverImage,
            age_range: ageRange,
            duration,
            category,
          },
        ])
        .select();

      if (insertError) {
        setDebugInfo(`Supabase error: ${insertError.message}`);
        throw insertError;
      }

      setDebugInfo(`Success! Story created with ID: ${data?.[0]?.id}`);

      // Redirect to the stories list
      setTimeout(() => {
        router.push("/stories");
        router.refresh(); // Refresh the page to show the new story
      }, 1000); // Short delay to see the success message
    } catch (err: any) {
      console.error("Error creating story:", err);
      setError(`Failed to create story: ${err.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">Create a New Story</h1>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">{error}</div>}
      {debugInfo && <div className="bg-blue-50 text-blue-700 p-4 rounded-md mb-6">{debugInfo}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 mb-1">
              Age Range
            </label>
            <input
              type="text"
              id="ageRange"
              name="ageRange"
              placeholder="e.g. 3-6 years"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Reading Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="e.g. 5 mins"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image URL (optional)
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank to use a default image. In a real app, you would upload an image here.
          </p>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Story Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            required
            placeholder="Once upon a time..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Use blank lines to separate paragraphs.</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Story"}
          </button>
        </div>
      </form>
    </div>
  );
}
