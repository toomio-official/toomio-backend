import { IsDate, IsEmail, IsString, Matches } from 'class-validator';

export class AuthRegisterUserDto {
  @IsEmail()
  email: string;

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
    { message: 'invalid password' },
  )
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  profilePicture: string;

  @IsString()
  gender: string;

  @IsDate()
  birthDate: string;
}
