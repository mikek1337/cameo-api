import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { SignupService } from './service/signup.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleCallbackController } from './controllers/google-callback.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UserService } from 'src/user/service/user.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AuthController, GoogleCallbackController],
  providers: [
    SignupService,
    GoogleStrategy,
    JwtStrategy,
    UserService,
    JwtService,
    ConfigService,
  ],
})
export class AuthModule {}
