import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/interfaces/user';
import { UserService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignupService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async googleLogin(req) {
    if (!req.user) {
      return false;
    } else {
      const exists = await this.userService.isUserExist(req.user.email);
      if (exists) {
        const { id } = await this.userService.getUserByEmail(req.user.email);
        const updatedUser = await this.userService.updateUser(id, req.user);
        return this.jwtService.sign({
          sub: updatedUser.id,
          email: updatedUser.email,
        },{
          secret: 'test',
        });
      }
      const user: UserDto = {
        first_name: req.user.firstName,
        last_name: req.user.lastName,
        email: req.user.email,
        profile_picture: req.user.picture,
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken,
      };
      const newUser = await this.userService.createUser(user);
      return this.jwtService.sign({ sub: newUser.id, email: newUser.email });
    }
  }
}
