import { IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {IsPassword} from "../../../decorators/validators.decorators";

export class UpdateUserDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsPhoneNumber('AM',{message: 'Phone has been Valid Phone number'})
    phone?: string | undefined;

    @ApiPropertyOptional()
    @IsOptional()
    birthday?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsPassword()
    password?: string;
}
