import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from '@src/constants/constants';
import { User } from '@src/user/entities/user.entity';
import { CustomConfigService } from './custom-config.service';

@Injectable()
export class ConnectionConfigService {
  constructor(private readonly configService: CustomConfigService) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.configService.get<string>(POSTGRES_HOST),
      port: this.configService.get<number>(POSTGRES_PORT),
      username: this.configService.get<string>(POSTGRES_USERNAME),
      password: this.configService.get<string>(POSTGRES_PASSWORD),
      database: this.configService.get<string>(POSTGRES_DB),

      synchronize: true,

      entities: [User],
    };
  }
}
