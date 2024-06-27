import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { SignupService } from '../service/signup.service';
import { GoogleOAuthGuard } from 'src/google-oauth.guard';
@Controller('auth')
export class LoginController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly signupService: SignupService) {}
  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  getSignup(@Request() req) {
    return this.signupService.googleLogin(req);
  }
}
