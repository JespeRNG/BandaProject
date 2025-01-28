import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  ACCESS_EXPIRESIN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  REFRESH_EXPIRESIN,
} from '@src/constants/constants';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async createTokens(
    id: string,
    username: string
  ): Promise<TokensDto> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: id,
        username,
      },
      {
        secret: JWT_ACCESS_SECRET,
        expiresIn: ACCESS_EXPIRESIN, // 5 minutes in secods
      }
    );

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

    return { accessToken, refreshToken };
  }
}
