import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request as req, Response as res } from 'express';

import { SessionService } from '@src/session/session.service';
import { TokenService } from '@src/token/token.service';
import { AccessUserDto } from '@src/user/dto/access-user.dto';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';
import { TokensDto } from '../token/dto/tokens.dto';
import { TokenTypeGuard } from './decorators/token-type.decorator';
import { LoginDto } from './dto/login.dto';
import { TokenType } from './enums/token-type.enum';
import { SkipAuth } from './guards/skip-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService
  ) {}

  @Post('sign-up')
  @SkipAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: User,
    description: 'User was created and tokens were returned.',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists.',
  })
  public async signUp(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  @SkipAuth()
  @ApiOperation({
    summary: 'Signs in, returns tokens and adds them to cookies',
  })
  @ApiOkResponse({ type: TokensDto })
  @ApiResponse({
    status: 404,
    description: 'No user found for username: ${username}',
  })
  @ApiResponse({ status: 401, description: 'Invalid password' })
  public async signIn(@Body() loginDto: LoginDto): Promise<{
    tokens: TokensDto;
    userMetaData: AccessUserDto;
  }> {
    const tokensDto = await this.authService.signIn(loginDto);
    const userMetaData = await this.userService.getUserMetadata(
      loginDto.username
    );

    return { tokens: tokensDto, userMetaData };
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Logs user out.',
  })
  @TokenTypeGuard(TokenType.ACCESS)
  @ApiBearerAuth()
  public async logout(
    @Request() request: req,
    @Response() response: res
  ): Promise<void> {
    const authorization = request.headers.authorization!;
    const accessToken = (authorization?.split(' ') ?? [])[1]!;

    const decodedToken = this.tokenService.decodeToken(accessToken);
    console.log(`SessionId: ${decodedToken.sessionId}`);

    await this.sessionService.deleteSession(decodedToken.sessionId);

    response.sendStatus(200);
  }

  @Get('refresh')
  @TokenTypeGuard(TokenType.REFRESH)
  @ApiBearerAuth()
  public async refresh(@Request() request: req): Promise<TokensDto> {
    const authorization = request.headers.authorization!;
    const refreshToken = (authorization?.split(' ') ?? [])[1]!;

    const session =
      await this.sessionService.findByRefreshToken(refreshToken);

    const decodedToken = this.tokenService.decodeToken(refreshToken);

    const accessToken = await this.tokenService.signAccessToken(
      decodedToken.sub,
      decodedToken.username,
      session.id
    );

    return { accessToken, refreshToken };
  }
}
