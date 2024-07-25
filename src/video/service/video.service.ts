import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { VideoRequest } from '../dto/videoRequest';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService: PrismaService) {}

  async createVideoRequest(videoRequest: VideoRequest) {
    return this.prismaService.videoRequest.create({
      data: {
        title: videoRequest.title,
        description: videoRequest.description,
        consumer_id: videoRequest.consumerID,
        creator_id: videoRequest.creatorID,
      },
    });
  }
}
