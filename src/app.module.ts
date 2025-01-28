import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CustomConfigModule } from './customConfig/custom-config.module';
import { DatabaseModule } from './datasource/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
