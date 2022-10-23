import { ApiProperty } from '@nestjs/swagger';
import {UserDto} from "../user/user.dto";
import {TokenPayloadDto} from "../auth/token-payload.dto";
import { FolowDto } from './folow.dto';


export class FolowPayloadDto {
    @ApiProperty({ type: UserDto })
    user: UserDto;
    folowing:FolowDto;

    constructor(user: UserDto,folowing:FolowDto) {
        this.user = user;
        this.folowing = folowing;
    }
}
