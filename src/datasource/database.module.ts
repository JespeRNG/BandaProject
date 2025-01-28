import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionConfigService } from '@src/customConfig/connection-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (
        connectionConfigService: ConnectionConfigService
      ) => connectionConfigService.getTypeOrmConfig(),
      inject: [ConnectionConfigService],
    }),
  ],
})
export class DatabaseModule {}
