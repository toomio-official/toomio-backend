import { IsEmail, IsNotEmpty } from 'class-validator';

export class CommentSmPostDto {
  @IsNotEmpty()
  smPostId: string;
  @IsEmail()
  userEmail: string;
  @IsNotEmpty()
  content: string;
}
