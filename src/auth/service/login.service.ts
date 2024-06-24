import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  googleLogin(req) {
    if (!req.user) {
      return 'Failed to login';
    } else {
      return {
        message: 'User information from google',
        user: req.user,
      };
    }
  }
}
