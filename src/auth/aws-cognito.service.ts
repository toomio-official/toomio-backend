import { Injectable, NotAcceptableException } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminDeleteUserCommand,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthLoginUserDto } from './dto/auth-login-user.dto';
import { AuthRegisterUserDto } from './dto/auth-register-user.dto';
import { AuthChangePasswordUserDto } from './dto/auth-change-password-user.dto';
import { AuthConfirmPasswordUserDto } from './dto/auth-confirm-password-user.dto';
import { AuthForgotPasswordUserDto } from './dto/auth-forgot-password-user.dto';
import { AuthGetUserDto } from './dto/auth-get-user.dto';
import { AuthDeleteUserDto } from './dto/auth-delete-user.dto';
import { UserRepository } from './users/user.repository';
import { UserCreateDto } from './users/dto/userCreate.dto';
import mongoose from 'mongoose';

@Injectable()
export class AwsCognitoService {
  private userPool: CognitoUserPool;
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(private userRepository: UserRepository) {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    });

    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });
  }

  async registerUser(authRegisterUserDto: AuthRegisterUserDto) {
    const {
      email,
      password,
      firstName,
      lastName,
      profilePicture,
      gender,
      birthDate,
    } = authRegisterUserDto;

    const user = await this.userRepository.findAUser(email);
    if (user) {

      throw NotAcceptableException;
    }
    const userCreateDto = new UserCreateDto();
    userCreateDto._id = new mongoose.Types.ObjectId();
    userCreateDto.email = email;
    userCreateDto.firstName = firstName;
    userCreateDto.lastName = lastName;
    userCreateDto.profilePicture = profilePicture;
    userCreateDto.gender = gender;
    userCreateDto.birthDate = birthDate;
    await this.userRepository.createUser(userCreateDto);

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'given_name',
            Value: firstName,
          }),
          new CognitoUserAttribute({
            Name: 'family_name',
            Value: lastName,
          }),
          new CognitoUserAttribute({
            Name: 'picture',
            Value: profilePicture,
          }),
          new CognitoUserAttribute({
            Name: 'gender',
            Value: gender,
          }),
          new CognitoUserAttribute({
            Name: 'birthdate',
            Value: birthDate,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async authenticateUser(authLoginUserDto: AuthLoginUserDto) {
    const { email, password } = authLoginUserDto;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async changeUserPassword(
    authChangePasswordUserDto: AuthChangePasswordUserDto,
  ) {
    const { email, currentPassword, newPassword } = authChangePasswordUserDto;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: currentPassword,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          userCognito.changePassword(
            currentPassword,
            newPassword,
            (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(result);
            },
          );
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async forgotUserPassword(
    authForgotPasswordUserDto: AuthForgotPasswordUserDto,
  ) {
    const { email } = authForgotPasswordUserDto;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async confirmUserPassword(
    authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
  ) {
    const { email, confirmationCode, newPassword } = authConfirmPasswordUserDto;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.confirmPassword(confirmationCode, newPassword, {
        onSuccess: () => {
          resolve({ status: 'success' });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async getUser(authGetUserDto: AuthGetUserDto) {
    const { email } = authGetUserDto;

    const command = new AdminGetUserCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      Username: email,
    });

    return this.cognitoClient.send(command);
  }

  async listUsers() {
    const command = new ListUsersCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    });

    return this.cognitoClient.send(command);
  }

  async searchUsers(name: string) {
    const command = new ListUsersCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      Filter: `given_name ^= "${name}" OR family_name ^= "${name}"`,
    });

    return this.cognitoClient.send(command);
  }

  async deleteUser(authDeleteUserDto: AuthDeleteUserDto) {
    const { email } = authDeleteUserDto;

    const command = new AdminDeleteUserCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      Username: email,
    });

    return this.cognitoClient.send(command);
  }
}
