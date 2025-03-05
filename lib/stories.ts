import { Story, StoryCategory } from "@/types/story";
import { supabase } from "./supabase";
import { Database } from "@/types/supabase";

type SupabaseStory = Database["public"]["Tables"]["stories"]["Row"];

// Convert a Supabase story to our Story type
function mapSupabaseStory(item: SupabaseStory): Story {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    coverImage: item.cover_image,
    ageRange: item.age_range,
    duration: item.duration,
    category: item.category as StoryCategory,
  };
}

// Get all stories from Supabase
export async function getAllStoriesAsync(): Promise<Story[]> {
  try {
    const { data, error } = await supabase.from("stories").select("*");

    if (error) {
      console.error("Error fetching stories from Supabase:", error);
      return [];
    }

    // Convert Supabase data to our Story type
    return (data as SupabaseStory[]).map(mapSupabaseStory);
  } catch (error) {
    console.error("Error in getAllStoriesAsync:", error);
    return [];
  }
}

// Synchronous version that returns an empty array initially
// Client components will need to fetch data themselves
export function getAllStories(): Story[] {
  return [];
}

// Get featured stories (most recent ones)
export async function getFeaturedStoriesAsync(count: number = 3): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(count);

    if (error) {
      console.error("Error fetching featured stories:", error);
      return [];
    }

    return (data as SupabaseStory[]).map(mapSupabaseStory);
  } catch (error) {
    console.error("Error in getFeaturedStoriesAsync:", error);
    return [];
  }
}

// Synchronous version for client components
export function getFeaturedStories(count: number = 3): Story[] {
  return [];
}

// Get a story by ID
export async function getStoryByIdAsync(id: string): Promise<Story | undefined> {
  try {
    const { data, error } = await supabase.from("stories").select("*").eq("id", id).single();

    if (error || !data) return undefined;

    return mapSupabaseStory(data as SupabaseStory);
  } catch (error) {
    console.error("Error in getStoryByIdAsync:", error);
    return undefined;
  }
}

// Synchronous version for client components
export function getStoryById(id: string): Story | undefined {
  return undefined;
}

// Get stories by category
export async function getStoriesByCategoryAsync(category: StoryCategory): Promise<Story[]> {
  try {
    const { data, error } = await supabase.from("stories").select("*").eq("category", category);

    if (error) {
      console.error("Error fetching stories by category:", error);
      return [];
    }

    return (data as SupabaseStory[]).map(mapSupabaseStory);
  } catch (error) {
    console.error("Error in getStoriesByCategoryAsync:", error);
    return [];
  }
}

// Get related stories (same category, excluding current story)
export async function getRelatedStoriesAsync(currentStoryId: string, count: number = 3): Promise<Story[]> {
  try {
    // First get the current story to find its category
    const currentStory = await getStoryByIdAsync(currentStoryId);
    if (!currentStory) return [];

    // Then get other stories in the same category
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("category", currentStory.category)
      .neq("id", currentStoryId)
      .limit(count);

    if (error) {
      console.error("Error fetching related stories:", error);
      return [];
    }

    return (data as SupabaseStory[]).map(mapSupabaseStory);
  } catch (error) {
    console.error("Error in getRelatedStoriesAsync:", error);
    return [];
  }
}

// Synchronous version for client components
export function getRelatedStories(currentStoryId: string, count: number = 3): Story[] {
  return [];
}

// Search stories
export async function searchStoriesAsync(query: string): Promise<Story[]> {
  try {
    // Basic search implementation - in a real app, you'd use full-text search
    const { data, error } = await supabase.from("stories").select("*");

    if (error) {
      console.error("Error searching stories:", error);
      return [];
    }

    const searchTerm = query.toLowerCase();
    const filteredData = (data as SupabaseStory[]).filter(
      (story) =>
        story.title.toLowerCase().includes(searchTerm) ||
        story.description.toLowerCase().includes(searchTerm) ||
        story.category.toLowerCase().includes(searchTerm)
    );

    return filteredData.map(mapSupabaseStory);
  } catch (error) {
    console.error("Error in searchStoriesAsync:", error);
    return [];
  }
}
