import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import { CreateSessionDto } from '../dto/create-session.dto';
import { Session } from '../entities/session.entity';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly repository: Repository<Session>
  ) {}

  public create(sessionDto: CreateSessionDto): Promise<Session> {
    const session = this.repository.create(sessionDto);
    return this.repository.save(session);
  }

  public findSessionsOfUser(userId: string): Promise<Session[]> {
    const sessions = this.repository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return sessions;
  }

  public findByRefreshToken(
    refreshToken: string
  ): Promise<Session | null> {
    const session = this.repository.findOne({
      where: { refreshToken },
    });

    return session;
  }

  public clearExpiredSessions(): void {
    const currentDate = new Date();

    this.repository.delete({
      expiresAt: LessThan(currentDate),
    });
  }

  public async delete(sessionId: string): Promise<void> {
    this.repository.delete({ id: sessionId });
  }
}
