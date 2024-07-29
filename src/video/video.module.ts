import { Module } from '@nestjs/common';
import { VideoController } from './controller/video.controller';
import { VideoService } from './service/video.service';
import { PrismaService } from 'src/database/service/prisma.service';
import { CreatorService } from 'src/user/service/creator.service';

@Module({
  imports: [],
  controllers: [VideoController],
  providers: [VideoService, PrismaService, CreatorService],
})
export class VideoModule {}
