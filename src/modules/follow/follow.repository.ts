import { Repository } from 'typeorm';
import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { UserNotFoundException } from './exceptions/follow-not-found.exception';
import { FollowEntity } from './follow.entity';

@CustomRepository(FollowEntity)
export class FollowRepository extends Repository<FollowEntity> {
  async findById(id: string): Promise<FollowEntity | null> {
    return this.findOne({ where: { id } })
  }
  async findByfollowerId(followerId: string,followingId: string): Promise<FollowEntity | null> {
    return this.findOne({ where: { followerId,followingId } }).catch((err) => {
      throw new UserNotFoundException();
    });
  }
}
