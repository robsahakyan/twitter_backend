import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../db/typeorm-ex.module';
import { FollowController } from './follow.controller';
import { FollowRepository } from './follow.repository';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([FollowRepository])],
  controllers: [FollowController],
  exports: [FollowService],
  providers: [FollowService],
})
export class FollowModule {}
