import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConnectionConfigService } from './connection-config.service';
import { CustomConfigService } from './custom-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [CustomConfigService, ConnectionConfigService],
  exports: [CustomConfigService, ConnectionConfigService],
})
export class CustomConfigModule {}
