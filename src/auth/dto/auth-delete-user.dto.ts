import { IsEmail } from 'class-validator';

export class AuthDeleteUserDto {
  @IsEmail()
  email: string;
}
