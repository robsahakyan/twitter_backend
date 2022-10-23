import { HashtagDto } from './../hashtag/hashtag.dto';
import { ImageDto } from './../image/image.dto';
import { UserDto } from './../user/user.dto';
import { AbstractDto } from '../../dtoes/abstract.dto';
import { TweetEntity } from "../../../tweet/tweet.entity";
import { ApiProperty } from '@nestjs/swagger';

export class TweetDto extends AbstractDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  user?: UserDto;

  @ApiProperty()
  media?: ImageDto[];

  constructor(tweet: TweetEntity) {
    super(tweet);
    this.text = tweet.text;
    this.user = tweet.user?.toDto();
    this.media = tweet.media?.map((image) => image.toDto());
  }
}
