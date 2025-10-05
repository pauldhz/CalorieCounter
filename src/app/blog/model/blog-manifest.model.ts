export interface BlogPost {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cover: string;
  draft: boolean;
  lang: string;
  date: string;
  slug: string;
  filename: string;
  excerpt: string;
  readingTime: number;
}

export interface BlogManifest {
  posts: BlogPost[];
  lastUpdated: string;
  totalPosts: number;
}
