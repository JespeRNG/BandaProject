import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request as req } from 'express';
import * as UAParser from 'ua-parser-js';

import { AccessUserDto } from '@src/user/dto/access-user.dto';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';
import { SkipAuth } from './guards/skip-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
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

  @Post('signin')
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

    return { tokens: tokensDto, userMetaData: userMetaData };
  }
}
