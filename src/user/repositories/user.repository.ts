import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  private get repository(): Repository<User> {
    return this.dataSource.getRepository(User);
  }

  public findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  public async findByUsername(
    username: string
  ): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { username },
    });

    return user;
  }

  public async createUser(
    createUserDto: CreateUserDto
  ): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }
}
