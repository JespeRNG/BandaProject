import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '@src/auth/interfaces/jwt-payload';
import {
  ACCESS_EXPIRESIN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  REFRESH_EXPIRESIN,
} from '@src/constants/constants';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async signAccessToken(
    userId: string,
    username: string,
    sessionId: string
  ): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        username,
        sessionId,
        type: 'ACCESS',
      },
      {
        secret: JWT_ACCESS_SECRET,
        expiresIn: ACCESS_EXPIRESIN, // 5 minutes in seconds
      }
    );
    return accessToken;
  }

  public async signRefreshToken(
    userId: string,
    username: string
  ): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        username,
        type: 'REFRESH',
      },
      {
        secret: JWT_REFRESH_SECRET,
        expiresIn: REFRESH_EXPIRESIN, //7 days
      }
    );
    return refreshToken;
  }

  public decodeToken(token: string): JwtPayload {
    const decodedToken = this.jwtService.decode(token);

    return decodedToken;
  }
}
