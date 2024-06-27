import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { SignupService } from './service/signup.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleCallbackController } from './controllers/google-callback.controller';

@Module({
  imports: [],
  controllers: [LoginController, GoogleCallbackController],
  providers: [SignupService, GoogleStrategy],
})
export class AuthModule {}
