import { ImageRepository } from './image.repository';
import { HashtagRepository } from './hashtag.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../db/typeorm-ex.module';
import { TweetController } from './tweet.controller';
import { TweetRepository } from './tweet.repository';
import { TweetService } from './tweet.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TweetRepository, HashtagRepository, ImageRepository])],
  controllers: [TweetController],
  exports: [TweetService],
  providers: [TweetService],
})
export class TweetModule {}