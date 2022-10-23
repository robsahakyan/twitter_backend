import { AbstractDto } from '../../dtoes/abstract.dto';
import {FollowEntity} from "../../../follow/follow.entity";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../user/user.entity';
export class FollowDto extends AbstractDto {
  @ApiProperty()
  follower: UserEntity;  

  @ApiProperty()
  following: UserEntity;

  constructor(follow: FollowEntity) {
    super(follow);
    this.follower = follow?.follower;
    this.following = follow?.following;
  }
}
