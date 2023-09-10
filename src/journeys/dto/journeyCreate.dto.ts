import { IsNotEmpty, IsString } from 'class-validator';

export class JourneyCreateDto {
  @IsNotEmpty()
  title: string;
  description: string;
  @IsNotEmpty()
  userName: string;
}
