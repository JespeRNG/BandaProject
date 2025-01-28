import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import {
  IS_SKIP_AUTH_KEY,
  JWT_ACCESS_SECRET,
} from '@src/constants/constants';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_AUTH_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isSkipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException('No tokens provided.');
    }

    const decodedToken = this.jwtService.verify(accessToken, {
      secret: JWT_ACCESS_SECRET,
    });

    const user = await this.userService.findById(decodedToken['sub']);
    if (!user) {
      throw new UnauthorizedException('Not valid user.');
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Request
  ): string | undefined {
    const [type, token] =
      request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
