import { AbstractDto } from '../../dtoes/abstract.dto';
import {UserEntity} from "../../../user/user.entity";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends AbstractDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthday: Date;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.email = user.email;
    this.phone = user.phone;
    this.lastName = user.lastName;
    this.birthday = user.birthday;
  }
}
