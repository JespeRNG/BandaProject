import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository
  ) {}

  public async createSession(
    sessionDto: CreateSessionDto
  ): Promise<Session> {
    if (sessionDto === null) {
      throw new BadRequestException(
        `${typeof sessionDto} cannot be null.`
      );
    }

    const session = await this.sessionRepository.create(sessionDto);
    return session;
  }

  @Cron(CronExpression.EVERY_HOUR)
  public clearExpiredSessions(): void {
    this.sessionRepository.clearExpiredSessions();
  }
}
