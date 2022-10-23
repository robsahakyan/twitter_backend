import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guart';
import { FolowPayloadDto } from 'modules/common/modules/folow/folow-playload.dto';
import { FolowDto } from '../../modules/common/modules/folow/folow.dto';
import { FolowService } from './folow.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserDto } from '../../modules/common/modules/user/user.dto';
@Controller('folowers')
@ApiTags('folowers')
@UseGuards(JwtGuard)

export class FolowController {
  constructor(public readonly folowService: FolowService) {}


  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: String, description: 'Successfully ' })
  async folow(
    @Body() folowDto,
    @AuthUser() user: UserDto
    ) {
    return this.folowService.folow(folowDto,user);
    
  }


}
