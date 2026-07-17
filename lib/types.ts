export type User = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
};

export type TagMeta = {
  name: string;
  color: string;
};

export type Comment = {
  user: string;
  text: string;
  time: string;
  isAnswer?: boolean;
};

export type PostType = "article" | "qa";

export type Post = {
  id: number;
  type: PostType;
  title: string;
  author: string;
  tags: string[];
  content: string;
  likes: number;
  comments: Comment[];
  views: number;
  createdAt: string;
  pinned?: boolean;
  resolved?: boolean;
  bestAnswer?: string;
};
