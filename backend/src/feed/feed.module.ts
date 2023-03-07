import { Module } from '@nestjs/common';
import { FeedService } from './controllers/feed.service';

@Module({
  providers: [FeedService]
})
export class FeedModule {}
