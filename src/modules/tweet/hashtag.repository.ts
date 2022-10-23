import { Repository } from 'typeorm';

import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { HashtagEntity } from './hashtag.entity';

@CustomRepository(HashtagEntity)
export class HashtagRepository extends Repository<HashtagEntity> {
  async findById(id: string): Promise<HashtagEntity | null> {
    return this.findOne({ where: { id } });
  }

  async findByName(hashtag: string): Promise<HashtagEntity[] | null> {
    return await this.createQueryBuilder('hashtags')
    .andWhere('hashtags.hashtagText = :hashtag', {hashtag})
    .leftJoinAndSelect('hashtags.tweet', 'tweet')
    .getMany();
  }
}
