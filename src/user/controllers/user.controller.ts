import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Request } from 'express';
import { Creator, CreatorDto } from '../interfaces/creator';
import { CreatorService } from '../service/creator.service';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @UseGuards(JwtAuthGuard)
  @Post('creatorProfile')
  @UseInterceptors(FileInterceptor('profile_picture'))
  async updateCreator(
    @Req() req: any,
    @Body() body: Creator,
    @UploadedFile() profile_pic: Express.Multer.File,
  ) {
    const { id } = req.user;
    const user = await this.userService.getUserById(id);
    const creator = await this.creatorService.getCreatorByUserID(id);
    console.log(profile_pic);
    if (user) {
      user.profile_picture = body.user.profile_picture;
      user.first_name = body.user.first_name;
      user.last_name = body.user.last_name;
      await this.userService.updateUser(id, user);
    }
    if (creator) {
      creator.bio = body.bio;
      creator.price = body.price;
      creator.profession = body.profession;
      await this.creatorService.updateCreator(creator.id, creator);
    }
  }
}
