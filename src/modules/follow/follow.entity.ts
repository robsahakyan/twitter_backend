import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { FollowDto } from '../common/modules/follow/follow.dto';
import { UserEntity } from '../user/user.entity';


@Entity({ name: 'follows' })
export class FollowEntity extends AbstractEntity<FollowDto> {

  @Column({type: 'uuid'})
  followerId: string;
  
  @Column({type: 'uuid'})
  followingId: string;

  @ManyToOne(() => UserEntity, (user) => user.follower)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;


  @ManyToOne(() => UserEntity, (user) => user.following)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;

  dtoClass = FollowDto;
}
