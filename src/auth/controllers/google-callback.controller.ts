import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
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
  googleCallback(@Request() res) {
    return this.signupService.googleLogin(res);
  }
}
