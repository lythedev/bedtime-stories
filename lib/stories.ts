import { Story, StoryCategory } from "@/types/story";
import { stories } from "@/data/stories";

export function getAllStories(): Story[] {
  return stories;
}

export function getFeaturedStories(count: number = 3): Story[] {
  return stories.slice(0, count);
}

export function getStoryById(id: string): Story | undefined {
  return stories.find((story) => story.id === id);
}

export function getStoriesByCategory(category: StoryCategory): Story[] {
  return stories.filter((story) => story.category === category);
}

export function getRelatedStories(currentStoryId: string, count: number = 3): Story[] {
  const currentStory = getStoryById(currentStoryId);
  if (!currentStory) return [];

  return stories
    .filter((story) => story.id !== currentStoryId && story.category === currentStory.category)
    .slice(0, count);
}

export function searchStories(query: string): Story[] {
  const searchTerm = query.toLowerCase();
  return stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm) ||
      story.description.toLowerCase().includes(searchTerm) ||
      story.category.toLowerCase().includes(searchTerm)
  );
}
