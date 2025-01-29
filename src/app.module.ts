import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { CustomConfigModule } from './customConfig/custom-config.module';
import { DatabaseModule } from './datasource/database.module';
import { SessionModule } from './session/session.module';
import { TokenModule } from './token/token.module';
import { TokenService } from './token/token.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CustomConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    JwtModule,
    SessionModule,
    TokenModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    TokenService,
  ],
})
export class AppModule {}
