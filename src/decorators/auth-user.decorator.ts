import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { UserUnauthenticatedException } from '../modules/auth/exceptions/user-unauthenticated.exception';

export const AuthUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UserUnauthenticatedException()
    }

    return request.user;
  },
);
