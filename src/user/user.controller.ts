/* import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
//import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public postUser(@Body() createUserDto: CreateUserDto) {
    if (createUserDto === null) throw new BadRequestException(`{}`);
  }
}
 */
