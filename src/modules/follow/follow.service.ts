import { Injectable } from "@nestjs/common";
import { FollowRepository } from "./follow.repository";

@Injectable()
export class FollowService {
  constructor(private followRepository: FollowRepository) {}

  async follow(followDto, user) {
    let data = {
      followerId: user.id,
      followingId: followDto.following,
    };
    const validationFollowerId = await this.followRepository.findByfollowerId(
      data.followerId,
      data.followingId
    );
    const validationFollowingId = await this.followRepository.findByfollowerId(
      data.followingId,
      data.followerId
    );
    if (validationFollowerId) {
      return this.followRepository.delete(validationFollowerId.id);
    }
    if (validationFollowingId) {
      return this.followRepository.delete(validationFollowingId.id);
    } else {
      const followEntity = this.followRepository.create(data);
      return await this.followRepository.save(data);
    }
  }
}
