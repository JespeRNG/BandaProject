import { Module } from '@nestjs/common';

import { SessionModule } from '@src/session/session.module';
import { TokenModule } from '@src/token/token.module';
import { UserModule } from '@src/user/user.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    SessionModule,
    TokenModule,
    SessionModule,
    TokenModule,
  ],
  providers: [AccessTokenStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
