import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
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
  async googleAuth(@Req() req) {}
  @Get('callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Req() req) {
    const response = await this.signupService.googleLogin(req);
    if (!response) {
      return new UnauthorizedException();
    }
    //need to return access_token in cookie
    /* res.cookie('access_token', req.accessToken,{
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    }) */
    return {}
  }
}
