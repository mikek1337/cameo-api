import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { GoogleOAuthGuard } from 'src/google-oauth.guard';
@Controller('auth')
export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  getSignup(@Request() req) {
    console.log('google-redirect');
    return req;
  }
}
