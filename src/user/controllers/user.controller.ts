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
  async getUser(@Req() req: any) {
    const { id } = req?.user;
    const user = await this.userService.getUserById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateUser(@Req() req: any, @Body() body: CreatorDto) {
    const { id } = req.user;
    const user = await this.userService.getUserById(id);
    const creator = this.creatorService.createCreator({
      first_name: body.first_name,
      last_name: body.last_name,
      profession: body.profession,
      bio: body.bio,
      price: body.price,
      userid: user.id,
    });
    return creator;
  }

  @UseGuards(JwtAuthGuard)
  @Get('role')
  async getRole(@Req() req: any) {
    const { id } = req.user;
    const role = await this.userService.getRole(id);
    return role;
  }

  @UseGuards(JwtAuthGuard)
  @Get('creatorProfile')
  async getCreator(@Req() req: any) {
    const { id } = req.user;
    const creator = await this.creatorService.getCreatorByUserID(id);
    return creator;
  }

}
