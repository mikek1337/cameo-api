import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { GoogleOAuthGuard } from 'src/google-oauth.guard';
@Controller('auth')
export class LoginController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly loginService: LoginService) {}
  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  getLogin(@Request() req) {
    return this.loginService.googleLogin(req);
  }
}
