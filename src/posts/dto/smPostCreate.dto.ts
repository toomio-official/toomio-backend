import { IsNotEmpty } from 'class-validator';

export class SMPostCreateDto {
  @IsNotEmpty()
  title: string;
  content: string;
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  journeyId: string;
}
