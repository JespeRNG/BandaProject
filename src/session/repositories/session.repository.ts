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

  public clearExpiredSessions(): void {
    const currentDate = new Date();

    this.repository.delete({
      expiresAt: LessThan(currentDate),
    });
  }
}
