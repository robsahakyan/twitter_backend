import { ApiPropertyOptional } from '@nestjs/swagger';
import {  IsOptional } from 'class-validator';

export class CreateTweetDto {
  @ApiPropertyOptional()
  @IsOptional()
  text: string;

}
