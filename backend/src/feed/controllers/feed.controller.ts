import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() post: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, post);
  }
}
