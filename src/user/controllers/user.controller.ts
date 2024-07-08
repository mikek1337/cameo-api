import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Request } from 'express';
import { CreatorDto } from '../interfaces/creator';
import { CreatorService } from '../service/creator.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly creatorService: CreatorService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req: Request) {
    const token = req.cookies['access_token'];
    const user = await this.userService.getUserByToken(token);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateUser(@Req() req: Request, @Body() body: CreatorDto) {
    const token = req.cookies['access_token'];
    const user = await this.userService.getUserByToken(token);
    const creator = this.creatorService.createCreator({
      first_name: body.first_name,
      last_name: body.last_name,
      bio: body.bio,
      price: body.price,
      userid: user.id,
    });
    return creator;
  }
}
