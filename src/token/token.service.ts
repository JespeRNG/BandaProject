import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
    id: string,
    username: string,
    sessionId: string
  ): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: id,
        username,
        sessionId,
      },
      {
        secret: JWT_ACCESS_SECRET,
        expiresIn: ACCESS_EXPIRESIN, // 5 minutes in secods
      }
    );
    return accessToken;
  }

  public async signRefreshToken(
    id: string,
    username: string
  ): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: id,
        username,
      },
      {
        secret: JWT_REFRESH_SECRET,
        expiresIn: REFRESH_EXPIRESIN, //7 days
      }
    );
    return refreshToken;
  }
}
