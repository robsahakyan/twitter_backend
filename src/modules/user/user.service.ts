import { RegisterDto } from './../auth/dtoes/register.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UtilsProvider } from '../../providers/utils.provider';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(registerDto: RegisterDto) {
    const userEntity = this.userRepository.create(registerDto);

    userEntity.password = await UtilsProvider.generateHash(userEntity.password);

    return await this.userRepository.save(userEntity);
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
