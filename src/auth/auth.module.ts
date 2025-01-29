import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SessionModule } from '@src/session/session.module';
import { TokenModule } from '@src/token/token.module';
import { UserModule } from '@src/user/user.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule, SessionModule, TokenModule],
  providers: [AccessTokenStrategy, AuthService, AccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
