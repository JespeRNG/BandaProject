import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  @IsNotEmpty()
  readonly userId!: string;

  @IsString()
  readonly refreshToken!: string;
}
