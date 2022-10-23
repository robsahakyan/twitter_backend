import { UpdateUserDto } from './dtoes/update-user.dto';
import { RegisterDto } from './../auth/dtoes/register.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UtilsProvider } from '../../providers/utils.provider';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthUser } from 'decorators/auth-user.decorator';
import { AuthController } from 'modules/auth/auth.controller';
import { UserDto } from 'modules/common/modules/user/user.dto';

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

  async getByUserId(userId: string): Promise<UserDto> {
    return (await this.getEntityById(userId)).toDto()
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
      const currentUser = await this.userRepository.findById(userId);
      currentUser.password = await UtilsProvider.generateHash(currentUser.password);
      if (userId != currentUser.id) {
          throw new UserNotFoundException();
      }      
        await this.userRepository.update(userId, updateUserDto);

        return this.getByUserId(userId);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const currentUser = await this.userRepository.findById(id);
    if (id != currentUser.id) {
        throw new UserNotFoundException();
    } 
    return this.userRepository.delete(id);
  }

  async getAll(): Promise<UserDto[]> {
      const users = await  this.userRepository.find();
      return users.map(user => user.toDto())
  }

}
