import { JwtService } from '@nestjs/jwt';

import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from '@src/constants/constants';
import { TokensDto } from './dto/tokens.dto';

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
        expiresIn: 1000000,
      }
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: id,
        username,
      },
      {
        secret: JWT_REFRESH_SECRET,
        expiresIn: 1000000,
      }
    );

    return { accessToken, refreshToken };
  }
}
