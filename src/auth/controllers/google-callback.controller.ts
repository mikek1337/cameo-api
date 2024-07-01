import {
  Controller,
  Get,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from 'src/google-oauth.guard';
import { SignupService } from '../service/signup.service';

@Controller('auth/google')
export class GoogleCallbackController {
  constructor(private readonly signupService: SignupService) {}
  @Get()
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Request() req) {}
  @Get('callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Request() res) {
    const response = await this.signupService.googleLogin(res);
    if (!response) {
      return new UnauthorizedException();
    }
    return { status: 200, message: 'User created successfully' };
  }
}
