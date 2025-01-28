import { Module } from '@nestjs/common';

import { UserModule } from '@src/user/user.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, AccessTokenStrategy, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
