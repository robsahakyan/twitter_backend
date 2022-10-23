import { ApiProperty } from '@nestjs/swagger';
import {UserDto} from "../user/user.dto";
import {TokenPayloadDto} from "../auth/token-payload.dto";
import { FollowDto } from './follow.dto';


export class FollowPayloadDto {
    @ApiProperty({ type: UserDto })
    user: UserDto;
    following:FollowDto;

    constructor(user: UserDto,following:FollowDto) {
        this.user = user;
        this.following = following;
    }
}
