import { UserDto } from './../user/user.dto';
import { AbstractDto } from '../../dtoes/abstract.dto';
import {FollowEntity} from "../../../follow/follow.entity";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../user/user.entity';
export class FollowDto extends AbstractDto {
  @ApiProperty()
  follower?: UserDto;  

  @ApiProperty()
  following?: UserDto;

  constructor(follow: FollowEntity) {
    super(follow);
    this.follower = follow.follower?.toDto();
    this.following = follow.following?.toDto();
  }
}
