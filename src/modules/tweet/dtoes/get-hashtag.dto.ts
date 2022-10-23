import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetHashtagDto {
    @ApiProperty()
    @IsNotEmpty()
    hashtag: string
}