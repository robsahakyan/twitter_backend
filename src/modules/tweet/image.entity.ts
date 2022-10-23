import { ImageDto } from './../common/modules/image/image.dto';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { TweetEntity } from './tweet.entity';

@Entity({ name: 'images' })
export class ImageEntity extends AbstractEntity<ImageDto> {
  @Column()
  path: string;

  @ManyToOne(() => TweetEntity, (tweet) => tweet.media)
  @JoinColumn({ name: 'tweet_id' })
  tweet: TweetEntity;

  dtoClass = ImageDto;
}
