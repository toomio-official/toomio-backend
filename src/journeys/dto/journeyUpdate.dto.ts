import { IsNotEmpty } from 'class-validator';

export class JourneyUpdateDto {
  _id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
