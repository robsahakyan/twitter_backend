import { BadRequestException } from '@nestjs/common';

export class CanNotFollowUser extends BadRequestException {
  constructor(message?: string) {
    super('error', `can not follow user, ${message} ` );
  }
}
