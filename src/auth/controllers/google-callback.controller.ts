import {
  Controller,
  Get,
  Post,
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
  async googleCallback(@Req() req: Request, @Res({ passthrough: true }) res: any) {
    const token = await this.signupService.googleLogin(req);
    if (!token) {
      return new UnauthorizedException();
    }
    console.log(token);
    // const res =  Res();
    //need to return access_token in cookie
    //response isn't being set in the cookie 
    res.cookie('token', token, {
      httpOnly: true,
    });
    return {message: "fuck this shit"}
    
  }
}
