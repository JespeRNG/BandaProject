import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get<T>(name: string): T {
    const value = this.configService.get<T>(name);

    if (isNil(value)) {
      throw new InternalServerErrorException(
        `${name} parameter does not specified in .env file`
      );
    }

    return value;
  }

  public getOptional<T>(name: string): T | undefined {
    return this.configService.get<T>(name);
  }
}
