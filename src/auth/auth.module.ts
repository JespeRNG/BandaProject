import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@src/user/user.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [UserModule, JwtModule],
  providers: [
    TokenService,
    AccessTokenStrategy,
    AuthService,
    AccessTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
