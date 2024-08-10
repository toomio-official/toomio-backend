import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';

export class SMPostCreateDto {
  @IsNotEmpty()
  title: string;
  content: string;
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
  @IsNotEmpty()
  journey: string;
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  imageUrls?: string[];
}
