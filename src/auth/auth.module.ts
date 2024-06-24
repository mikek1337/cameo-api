import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './service/login.service';
import { GoogleOAuthGuard } from 'src/google-oauth.guard';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, GoogleStrategy],
})
export class AuthModule {}
