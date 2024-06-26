import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { SignupService } from './service/signup.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleCallbackController } from './controllers/google-callback.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UserService } from 'src/user/service/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController, GoogleCallbackController],
  providers: [SignupService, GoogleStrategy, UserService],
})
export class AuthModule {}
