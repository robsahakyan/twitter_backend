import { HashtagDto } from './../common/modules/hashtag/hashtag.dto';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { TweetEntity } from './tweet.entity';

@Entity({ name: 'hashtags' })
export class HashtagEntity extends AbstractEntity<HashtagDto> {
  @Column()
  hashtagText: string;

  @ManyToMany(() => TweetEntity, (tweet) => tweet.hashtag )
  tweet: TweetEntity;

  dtoClass = HashtagDto;
}


