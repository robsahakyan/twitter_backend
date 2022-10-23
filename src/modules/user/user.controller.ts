import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { RegisterDto } from '../auth/dtoes/register.dto';
import { UserDto } from '../common/modules/user/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UserService } from './user.service';
import { Auth } from '../../decorators/http.decorators';
import { UserEntity } from './user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Get(':id')
  @Auth()
  @ApiOkResponse({ type: RegisterDto, description: 'Successfully got' })
    async getUser(@Param('id') userId: string): Promise<UserDto> {
        return (await this.userService.getByUserId(userId))
    }

  @Get()
  @Auth()
  @ApiOkResponse({ type: UserDto, description: 'Successfully got all users' })
    async getAllUsers(): Promise<UserDto[]> {
        return await this.userService.getAll()

    }

  @Put(':id')
  @Auth()
  @ApiOkResponse({ type: RegisterDto, description: 'Successfully updated' })
    update(
        @Param('id') id: string,
        @Body() registerDto: RegisterDto,
    ) : Promise<UpdateResult> {
        return this.userService.updateUser(id, registerDto);
    }

  @Delete(':id') 
  @Auth()
  @ApiOkResponse({ type: RegisterDto, description: 'Successfully deleted' })
    delete(
        @Param('id') id: string
    ): Promise<DeleteResult> {
        
        return this.userService.deleteUser(id);
    }
}
