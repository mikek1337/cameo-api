import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreatorService } from './service/creator.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, CreatorService],
})
export class UserModule {}
