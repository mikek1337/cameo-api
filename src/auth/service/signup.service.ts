import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/interfaces/user';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class SignupService {
  constructor(private readonly userService: UserService) {}
  async googleLogin(req) {
    if (!req.user) {
      return false;
    } else {
      const exists = await this.userService.isUserExist(req.user.email);
      if (exists) {
        const { id } = await this.userService.getUserByEmail(req.user.email);
        return this.userService.updateUser(id, req.user);
      }
      const user: UserDto = {
        first_name: req.user.firstName,
        last_name: req.user.lastName,
        email: req.user.email,
        profile_picture: req.user.picture,
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken,
      };
      return this.userService.createUser(user);
    }
  }
}
