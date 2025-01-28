import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public createNewUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.createUser(createUserDto);
    return user;
  }

  public async findByUsername(
    username: string
  ): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    return user;
  }

  public async isUserExist(username: string): Promise<boolean> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return false;
    }
    return true;
  }
}
