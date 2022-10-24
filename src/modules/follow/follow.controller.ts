import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FollowService } from './follow.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserDto } from '../common/modules/user/user.dto';
import { updateParameter } from 'typescript';
import { Auth } from '../../decorators/http.decorators';
@Controller('followers')
@ApiTags('followers')
export class FollowController {
  constructor(public readonly followService: FollowService) {}

  @Post(":followingId")
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: String, description: 'Successfully ' })
  async follow(
    @Param('followingId') followingId: string,
    @AuthUser() user: UserDto
    ) {
    return this.followService.follow(followingId, user);
    
  }

  @Get()
  @Auth()
  async getUserFollowers(@AuthUser() user: UserDto) {
    return this.followService.getUserFollowers(user)
  }

}
