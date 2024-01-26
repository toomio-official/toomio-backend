import { IsEmail, IsNotEmpty } from "class-validator";

export class UserFollowDto {
    @IsNotEmpty()
    @IsEmail()
    followingUserEmail: string;
    @IsNotEmpty()
    @IsEmail()
    followerUserEmail: string;
}