import { FeedPost } from "./post.interface";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
  feedPosts?: FeedPost[];
}
