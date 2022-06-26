import { Entity } from 'typeorm';

import { AbstractEntity } from '../common/entities/abstract.entity';
import { UserDto } from '../common/modules/user/user.dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  dtoClass = UserDto;
}
