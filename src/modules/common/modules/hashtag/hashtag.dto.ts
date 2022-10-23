import { HashtagEntity } from './../../../tweet/hashtag.entity';
import { TweetDto } from './../tweet/tweet.dto';
import { AbstractDto } from '../../dtoes/abstract.dto';
import { TweetEntity } from "../../../tweet/tweet.entity";
import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'modules/tweet/image.entity';

export class HashtagDto extends AbstractDto {
  @ApiProperty()
  hashtagText: string;

  @ApiProperty()
  tweet?: TweetDto;

  constructor(hashtag: HashtagEntity) {
    super(hashtag);
    this.hashtagText = hashtag.hashtagText
    this.tweet = hashtag.tweet?.toDto()
  }
}