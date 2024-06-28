import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { UserDto } from '../interfaces/user';
import { last } from 'rxjs';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(newUser: UserDto): Promise<string> {
    const user = await this.prismaService.user.create({
      data: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        profile_picture: newUser.profile_picture,
        access_token: newUser.access_token,
        refresh_token: newUser.refresh_token,
      },
    });
    if (user) {
      return user.id;
    }
    return '';
  }

  async isUserExist(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }

  async updateUser(id: string, user: User): Promise<boolean> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: user.profile_picture,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      },
    });
    if (updatedUser) {
      return true;
    }
    return false;
  }
}
