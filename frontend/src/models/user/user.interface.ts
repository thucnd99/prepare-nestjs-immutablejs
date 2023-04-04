import { FeedPost } from "../post.interface";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  feedPosts?: FeedPost[];
}
