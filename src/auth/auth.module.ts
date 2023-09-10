import { Module } from '@nestjs/common';
import { AwsCognitoService } from './aws-cognito.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AwsCognitoService],
  controllers: [AuthController],
})
export class AuthModule {}
