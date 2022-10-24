import { FollowDto } from './../common/modules/follow/follow.dto';
import { UserDto } from './../common/modules/user/user.dto';
import { CanNotFollowUser } from './exceptions/follow-exception';
import { Injectable } from "@nestjs/common";
import { FollowRepository } from "./follow.repository";

@Injectable()
export class FollowService {
  constructor(private followRepository: FollowRepository) {}

  async follow(followingId: string, user: UserDto) {
    if (user.id === followingId) {
      throw new CanNotFollowUser()
    }
    let data = {
      followerId: user.id,
      followingId
    };
    
    const validationFollowerId = await this.followRepository.findByfollowerId(
      data.followerId,
      data.followingId
    );
    if (validationFollowerId) {
      return this.followRepository.delete(validationFollowerId.id);
    }
    else {
      const followEntity = this.followRepository.create(data);
      return await this.followRepository.save(data);
    }
  }

  async getUserFollowers(user: UserDto) {
    const followings = (await this.followRepository.getFollowersByUserId(user.id)).toDtos()
    const followers = (await this.followRepository.getFollowingsByUserId(user.id)).toDtos()

    return {
      followings,
      followers,
      user
    }
  }
}
