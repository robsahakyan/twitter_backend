import { Repository } from 'typeorm';
import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { TweetEntity } from './tweet.entity';

@CustomRepository(TweetEntity)
export class TweetRepository extends Repository<TweetEntity> {
  async findById(id: string): Promise<TweetEntity | null> {
    return this.createQueryBuilder('tweets')
    .where('tweets.id = :id',{ id })
    .leftJoinAndSelect('tweets.user', 'user')
    .leftJoinAndSelect('tweets.media', 'media')
    .getOne();
  }
}
