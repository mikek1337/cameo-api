import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserService } from './service/user.service';

Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserService],
});
