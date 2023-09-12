import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AwsCognitoService } from './aws-cognito.service';
import { AuthLoginUserDto } from './dto/auth-login-user.dto';
import { AuthRegisterUserDto } from './dto/auth-register-user.dto';
import { AuthChangePasswordUserDto } from './dto/auth-change-password-user.dto';
import { AuthConfirmPasswordUserDto } from './dto/auth-confirm-password-user.dto';
import { AuthForgotPasswordUserDto } from './dto/auth-forgot-password-user.dto';
import { AuthGetUserDto } from './dto/auth-get-user.dto';
import { AuthDeleteUserDto } from './dto/auth-delete-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private awsCognitoService: AwsCognitoService) {}

  @Post('/register')
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    return await this.awsCognitoService.registerUser(authRegisterUserDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.awsCognitoService.authenticateUser(authLoginUserDto);
  }

  @Post('/change-password')
  @UsePipes(ValidationPipe)
  async changePassword(
    @Body() authChangePasswordUserDto: AuthChangePasswordUserDto,
  ) {
    await this.awsCognitoService.changeUserPassword(authChangePasswordUserDto);
  }

  @Post('/forgot-password')
  @UsePipes(ValidationPipe)
  async forgotPassword(
    @Body() authForgotPasswordUserDto: AuthForgotPasswordUserDto,
  ) {
    return await this.awsCognitoService.forgotUserPassword(
      authForgotPasswordUserDto,
    );
  }

  @Post('/confirm-password')
  @UsePipes(ValidationPipe)
  async confirmPassword(
    @Body() authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
  ) {
    return await this.awsCognitoService.confirmUserPassword(
      authConfirmPasswordUserDto,
    );
  }

  @Post('/get-user')
  @UsePipes(ValidationPipe)
  async getUser(@Body() authGetUserDto: AuthGetUserDto) {
    return await this.awsCognitoService.getUser(authGetUserDto);
  }

  @Post('/delete-user')
  @UsePipes(ValidationPipe)
  async deleteUser(@Body() authDeleteUserDto: AuthDeleteUserDto) {
    return await this.awsCognitoService.deleteUser(authDeleteUserDto);
  }
}
