import { Controller, Get, Response } from '@nestjs/common';

@Controller('auth/google')
export class GoogleCallbackController {
  @Get('callback')
  googleCallback(@Response() res) {
    return res;
  }
}
