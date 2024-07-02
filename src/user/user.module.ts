import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
