import { FeedPost } from "../post.interface";

export interface UpdateUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
  feedPosts?: FeedPost[];
}
