import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/service/prisma.service";

@Injectable()
export class LoginService {
  constructor(private readonly prismaService:PrismaService, private readonly jwtService:JwtService) {}

  async login(req){
    if(!req.user) {
      return {status: false, token:''};
    }
    const doesEmailExist = await this.prismaService.user.findFirst({
      where:{
        email: req.user.email
      }
    });
    if(doesEmailExist)
    {
      const token = this.jwtService.sign({
       sub:doesEmailExist.id,
       email:doesEmailExist.email,
      },
      {
        secret: process.env.JWT_SECRET
      });
      return { status: true, token:token};
    }
    return {status:false, token: ''}

  }


}
