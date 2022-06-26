import { Injectable } from '@nestjs/common';
import type { UserDto } from '../common/modules/user/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(): Promise<UserDto> {
    const userEntity = this.userRepository.create();

    await this.userRepository.save(userEntity);

    return userEntity.toDto();
  }
}
