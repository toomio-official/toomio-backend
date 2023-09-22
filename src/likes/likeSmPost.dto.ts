import { IsEmail, IsNotEmpty } from 'class-validator';

export class LikeSmPostDto {
  @IsNotEmpty()
  smPostId: string;
  @IsEmail()
  userEmail: string;
}
