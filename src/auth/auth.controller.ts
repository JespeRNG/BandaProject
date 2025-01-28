import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
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
  @ApiOperation({
    summary: 'Signs in, returns tokens and adds them to cookies',
  })
  @ApiOkResponse({ type: TokensDto })
  @ApiResponse({
    status: 404,
    description: 'No user found for username: ${username}',
  })
  @ApiResponse({ status: 401, description: 'Invalid password' })
  public async signIn(loginDto: LoginDto): Promise<TokensDto> {
    return await this.authService.signIn(loginDto);
  }
}
