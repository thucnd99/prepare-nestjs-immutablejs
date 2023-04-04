import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { User } from 'src/auth/models/user.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private feedPostRepositoty: Repository<FeedPostEntity>,
  ) {}

  createPost(user: User, feedPost: FeedPost): Observable<FeedPost> {
    feedPost.author = user;
    return from(this.feedPostRepositoty.save(feedPost));
  }
}
