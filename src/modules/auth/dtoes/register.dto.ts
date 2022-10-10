import {LoginDto} from "./login.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

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
    phone: string

}
