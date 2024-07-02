import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from 'src/guards/google-oauth.guard';
import { SignupService } from '../service/signup.service';
import { Response } from 'express'; // Add this line

@Controller('auth/google')
export class GoogleCallbackController {
  constructor(private readonly signupService: SignupService) {}
  @Get()
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req) {}
  @Get('callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.signupService.googleLogin(req);
    if (!token) {
      return new UnauthorizedException();
    }
    // const res =  Res();
    //need to return access_token in cookie
    console.log(req);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
    return { status: 'success', message: 'User logged in successfully' };
  }
}
