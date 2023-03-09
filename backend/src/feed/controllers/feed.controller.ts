import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() post: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, post);
  }
}
