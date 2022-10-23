import { UserEntity } from './../user/user.entity';
import { HashtagEntity } from './hashtag.entity';
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { TweetDto } from '../common/modules/tweet/tweet.dto';
import { ImageEntity } from './image.entity';

@Entity({ name: 'tweets' })
export class TweetEntity extends AbstractEntity<TweetDto> {

  @Column({nullable: true})
  text: string;

  @OneToMany(() => ImageEntity, (image) => image.tweet)
  media?: ImageEntity[];

  @ManyToOne(() => UserEntity, (user) => user.tweet )
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToMany(() => HashtagEntity, (hashtag) => hashtag.tweet)
  @JoinTable({
    name: "tweets_hashtags"
  })
  hashtag: HashtagEntity;

  dtoClass = TweetDto;
}
