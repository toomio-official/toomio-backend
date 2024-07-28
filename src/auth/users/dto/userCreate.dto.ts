import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UserCreateDto {
  _id: mongoose.Types.ObjectId;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstName: string;
  lastName: string;
  profilePicture: string;
  gender: string;
  birthDate: string;
}
