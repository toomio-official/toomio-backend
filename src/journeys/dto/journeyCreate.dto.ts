import { IsNotEmpty, IsString } from 'class-validator';

export class JourneyCreateDto {
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  userName: string;
}
