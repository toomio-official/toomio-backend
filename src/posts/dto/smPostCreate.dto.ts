import { IsEmail, IsNotEmpty } from 'class-validator';

export class SMPostCreateDto {
  @IsNotEmpty()
  title: string;
  content: string;
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
  @IsNotEmpty()
  journey: string;
}
