import { Controller, UseGuards, Req, Post, Get, Query, Body } from '@nestjs/common';
import { Request } from 'express';
import { GoogleOAuthGuard } from 'src/guards/google-oauth.guard';
import { AuthService } from '../service/signup.service';
@Controller('auth')
export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly authService:AuthService) {}
  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  getSignup(@Req() req: Request, @Query() query: any) {
    console.log(query);
    return req;
  }

 
}
