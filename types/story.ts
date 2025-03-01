export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  ageRange: string;
  duration: string;
  category: StoryCategory;
  content?: string;
  dateAdded?: string;
}

export type StoryCategory = "fantasy" | "adventure" | "bedtime" | "moral";

export interface StoryWithContent extends Story {
  content: string;
}
