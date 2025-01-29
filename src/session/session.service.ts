import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  public async findByRefreshToken(
    refreshToken: string
  ): Promise<Session> {
    const session =
      await this.sessionRepository.findByRefreshToken(refreshToken);

    if (!session)
      throw new NotFoundException(
        `No session found for refreshToken: ${refreshToken}`
      );

    return session;
  }

  public async deleteSession(sessionId: string): Promise<void> {
    this.sessionRepository.delete(sessionId);
  }

  @Cron(CronExpression.EVERY_HOUR)
  protected clearExpiredSessions(): void {
    this.sessionRepository.clearExpiredSessions();
  }
}
