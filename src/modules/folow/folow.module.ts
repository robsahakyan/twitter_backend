import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../db/typeorm-ex.module';
import { FolowController } from './folow.controller';
import { FolowRepository } from './folow.repository';
import { FolowService } from './folow.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([FolowRepository])],
  controllers: [FolowController],
  exports: [FolowService],
  providers: [FolowService],
})
export class FolowModule {}
