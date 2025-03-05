export type Database = {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string;
          title: string;
          description: string;
          content: string;
          cover_image: string;
          age_range: string;
          duration: string;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          content: string;
          cover_image: string;
          age_range: string;
          duration: string;
          category: string;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          content?: string;
          cover_image?: string;
          age_range?: string;
          duration?: string;
          category?: string;
          created_at?: string;
        };
      };
    };
  };
};
