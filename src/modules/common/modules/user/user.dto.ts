import { AbstractDto } from '../../dtoes/abstract.dto';
import {UserEntity} from "../../../user/user.entity";

export class UserDto extends AbstractDto {

  constructor(user: UserEntity) {
    super(user);
  }
}
