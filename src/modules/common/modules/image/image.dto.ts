import { TweetDto } from './../tweet/tweet.dto';
import { AbstractDto } from '../../dtoes/abstract.dto';
import { TweetEntity } from "../../../tweet/tweet.entity";
import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'modules/tweet/image.entity';

export class ImageDto extends AbstractDto {
  @ApiProperty()
  path: string;

  constructor(image: ImageEntity) {
    super(image);
    this.path = image.path

  }
}