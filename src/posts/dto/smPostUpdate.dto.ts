import { IsNotEmpty } from 'class-validator';

export class SMPostUpdateDto {
  _id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
}
