import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AwsCognitoService } from './aws-cognito.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AwsCognitoService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
