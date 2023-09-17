import { IsEmail } from 'class-validator';

export class AuthGetUserDto {
  @IsEmail()
  email: string;
}
