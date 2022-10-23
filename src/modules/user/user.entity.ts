import { TweetEntity } from './../tweet/tweet.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { UserDto } from '../common/modules/user/user.dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ unique: true })
  phone?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({nullable: true})
  birthday: Date;

  @OneToMany(() => TweetEntity, (tweet) => tweet.user)
  tweet:  TweetEntity;

  dtoClass = UserDto;
}
