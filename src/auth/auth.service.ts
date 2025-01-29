import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SessionService } from '@src/session/session.service';
import { TokenService } from '@src/token/token.service';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';
import { TokensDto } from '../token/dto/tokens.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService
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
    const refreshToken = await this.tokenService.signRefreshToken(
      user.id,
      user.username
    );

    const session = await this.sessionService.createSession({
      userId: user.id,
      refreshToken,
    });

    if (!session)
      throw new InternalServerErrorException(
        `Session creation failed.`
      );

    const accessToken = await this.tokenService.signAccessToken(
      user.id,
      user.username,
      session.id
    );

    return { accessToken, refreshToken };
  }
}
