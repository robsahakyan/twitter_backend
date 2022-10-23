import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guart';
import { FollowPayloadDto } from 'modules/common/modules/follow/follow-playload.dto';
import { FollowDto } from '../common/modules/follow/follow.dto';
import { FollowService } from './follow.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserDto } from '../common/modules/user/user.dto';
@Controller('followers')
@ApiTags('followers')
@UseGuards(JwtGuard)

export class FollowController {
  constructor(public readonly followService: FollowService) {}


  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: String, description: 'Successfully ' })
  async follow(
    @Body() followDto,
    @AuthUser() user: UserDto
    ) {
    return this.followService.follow(followDto,user);
    
  }


}
