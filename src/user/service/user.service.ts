import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { UserDto } from '../interfaces/user';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(newUser: UserDto): Promise<User> {
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
      return user;
    }
    return null;
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

  async updateUser(id: string, user: User): Promise<User> {
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
      return updatedUser;
    }
    return null;
  }

  async getUserByToken(token: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: token,
      },
    });
    return user;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async getRole(id: string): Promise<string> {
    const creatorCount = await this.prismaService.creator.count({
      where: {
        userid: id,
      },
    });

    enum UserRole {
      Creator = 'creator',
      Consumer = 'consumer',
    }

    return creatorCount > 0 ? UserRole.Creator : UserRole.Consumer;
  }
}
