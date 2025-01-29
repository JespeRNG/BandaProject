import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Session } from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';
import { SessionService } from './session.service';

@Module({
  imports: [ScheduleModule, TypeOrmModule.forFeature([Session])],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
