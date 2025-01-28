import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

//import { UserService } from './user.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(/* private readonly userService: UserService */) {}

  @Get()
  @ApiOperation({ summary: 'Guarded?' })
  public async someGuardedEndpoint(): Promise<{ message: string }> {
    return { message: 'someMessage' };
  }
}
