import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  public async signUp(createUserDto: CreateUserDto): Promise<User> {
    const isUserExist = await this.userService.isUserExist(
      createUserDto.username
    );
    if (isUserExist) {
      throw new ConflictException(
        `Username ${createUserDto.username} is already taken.`
      );
    }

    const user = await this.userService.createNewUser(createUserDto);
    return user;
  }

  public async signIn(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.userService.findByUsername(
      loginDto.username
    );

    if (!user) {
      throw new NotFoundException(
        `No user found for username: ${loginDto.username}`
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    const tokensDto = await this.tokenService.createTokens(
      user.id,
      user.username
    );
    return tokensDto;
  }
}
