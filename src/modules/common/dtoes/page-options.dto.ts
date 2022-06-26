import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { OrderEnum } from '../../../constants/order.enum';

export class PageOptionsDto {
  @IsEnum(OrderEnum)
  @IsOptional()
  readonly order: OrderEnum = OrderEnum.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsString()
  @IsOptional()
  readonly q?: string;
}
