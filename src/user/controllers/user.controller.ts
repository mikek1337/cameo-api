import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JWTGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTGuard)
  @Get()
  async getUser(@Req() req) {
    const token = req.cookies['access_token'];
    const user = await this.userService.getUserByToken(token);
    return user;
  }
}
