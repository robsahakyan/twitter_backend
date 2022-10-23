import { AbstractDto } from '../../dtoes/abstract.dto';
import {FolowEntity} from "../../../folow/folow.entity";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../modules/user/user.entity';
export class FolowDto extends AbstractDto {
  @ApiProperty()
  folower: UserEntity;  

  @ApiProperty()
  folowing: UserEntity;

  constructor(folow: FolowEntity) {
    super(folow);
    this.folower = folow.folower;
    this.folowing = folow.folowing;
  }
}
