import {LoginDto} from "./login.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNotEmpty, IsPhoneNumber, IsString, IsOptional} from "class-validator";

export class RegisterDto extends LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsPhoneNumber('AM',{message: 'Phone has been Valid Phone number'})
    phone: string;

    @ApiPropertyOptional()
    @IsOptional()
    birthday: Date;

}
