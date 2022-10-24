import { CanNotFollowUser } from './exceptions/follow-exception';
import { Repository } from 'typeorm';
import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { FollowEntity } from './follow.entity';

@CustomRepository(FollowEntity)
export class FollowRepository extends Repository<FollowEntity> {
  async findById(id: string): Promise<FollowEntity | null> {
    return this.findOne({ where: { id } })
  }
  async findByfollowerId(followerId: string,followingId: string): Promise<FollowEntity | null> {
    return this.findOne({ where: { followerId,followingId } }).catch((err) => {
      throw new CanNotFollowUser();
    });
  }


  async getFollowersByUserId(userId: string) {
    return this.createQueryBuilder('follows')
      .where('follows.follower_id  = :userId', {userId})
      .leftJoinAndSelect('follows.following', 'following')
      .getMany()
  }

  async getFollowingsByUserId(userId: string) {
    return this.createQueryBuilder('follows')
      .where('follows.following_id  = :userId', {userId})
      .leftJoinAndSelect('follows.follower', 'follower')
      .getMany()
  }
}
