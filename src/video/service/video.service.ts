import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { VideoRequest } from '../dto/videoRequest';
import { CreatorService } from '../../user/service/creator.service';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService: PrismaService, private readonly creatorService: CreatorService) {}

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

  async requestCounter(id: string)
  {
    console.log(id)
    const creator = await this.prismaService.creator.findFirst({
      where: {
        userid: id
      }
    });
    console.log(creator)
    const count = await this.prismaService.videoRequest.count(
      {
        where:{
          creator_id: creator.id
        }
      }
    );
    return count;
  }
}
