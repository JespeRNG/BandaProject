import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(16)
  @MinLength(4)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username should be between 4 and 16 characters.',
    minLength: 4,
    maxLength: 16,
  })
  readonly username!: string;

  @MaxLength(128)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password should be between 6 and 128 characters.',
    minLength: 6,
    maxLength: 128,
  })
  readonly password!: string;

  @MaxLength(64)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email should be between 6 and 64 characters.',
    minLength: 6,
    maxLength: 64,
  })
  @IsEmail()
  readonly email!: string;
}
