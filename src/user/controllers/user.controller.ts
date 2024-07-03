import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Request } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req:Request) {
    console.log()
    const token = req.cookies['access_token'];
    const user = await this.userService.getUserByToken(token);
    return user;
  }
}
