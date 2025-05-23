export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
};

export type UserProfile = "Student" | "Junior Developer" | "Business Owner";
