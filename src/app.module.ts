import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { CustomConfigModule } from './customConfig/custom-config.module';
import { DatabaseModule } from './datasource/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
