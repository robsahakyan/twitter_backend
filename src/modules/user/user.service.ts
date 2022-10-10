import { RegisterDto } from './../auth/dtoes/register.dto';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { Injectable } from '@nestjs/common';
import type { UserDto } from '../common/modules/user/user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(registerDto: RegisterDto) {
    const userEntity = this.userRepository.create(registerDto);

    await this.userRepository.save(userEntity);

    return userEntity.toDto();
  }

  async getEntityById(userId: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findById(userId);
    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async getEntityByEmail(email: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findByEmail(email);
    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }
}
