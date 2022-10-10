import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

import { CacheKeyPrefixEnum } from '../constants/cache-key-prefix.enum';
import { UserUnauthenticatedException } from '../modules/auth/exception/user-unauthenticated.exception';
import type { UserDto } from '../modules/common/modules/user/user.dto';
import { ApiConfigService } from '../shared/services/api-config.service';
import { CacheService } from '../shared/services/cache.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ApiConfigService,
    private readonly cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request?.headers?.authorization;

    if (!authorizationHeader || !authorizationHeader.includes('Bearer ')) {
      throw new UserUnauthenticatedException();
    }

    const token = (authorizationHeader as string).slice(7);

    const user = (
      verify(token, this.configService.jwtConfig.secret) as { user: UserDto }
    )?.user;

    if (
      !(await this.cacheService.isCached(
        `${CacheKeyPrefixEnum.ACCESS_TOKEN}:${user.providerId}`,
        token,
      ))
    ) {
      throw new UserUnauthenticatedException();
    }

    request.user = user;

    return true;
  }
}
