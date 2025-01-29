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
  JWT_REFRESH_SECRET,
} from '@src/constants/constants';
import { UserService } from '@src/user/user.service';
import { TOKEN_TYPE_KEY } from '../decorators/token-type.decorator';
import { TokenType } from '../enums/token-type.enum';

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

    const requiredTokenType =
      this.reflector.getAllAndOverride<TokenType>(TOKEN_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || TokenType.ACCESS;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No tokens provided.');
    }

    let decodedToken;
    try {
      decodedToken = this.jwtService.verify(token, {
        secret:
          requiredTokenType === TokenType.ACCESS
            ? JWT_ACCESS_SECRET
            : JWT_REFRESH_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException(e, 'Invalid token.');
    }

    if (decodedToken.type !== requiredTokenType) {
      throw new UnauthorizedException(
        `Expected ${requiredTokenType} token.`
      );
    }

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
