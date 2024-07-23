import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { CreatorDto } from '../interfaces/creator';
import { Creator } from '@prisma/client';

@Injectable()
export class CreatorService {
  constructor(private readonly prismaService: PrismaService) {}

  createCreator(newCreator: CreatorDto): Promise<Creator> {
    return this.prismaService.creator.create({
      data: {
        profession: newCreator.profession,
        bio: newCreator.bio,
        price: newCreator.price,
        userid: newCreator.userid,
      },
    });
  }

  getTopCreators() {
    return this.prismaService.creator.findMany({
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            profile_picture: true,
          },
        },
      },
    });
  }

  getCreator(creatorID: string) {
    return this.prismaService.creator.findUnique({
      where: {
        id: creatorID,
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            profile_picture: true,
          },
        },
      },
    });
  }

  getCreatorByUserID(userID: string) {
    return this.prismaService.creator.findFirst({
      where: {
        userid: userID,
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            profile_picture: true,
          },
        },
      },
    });
  }

  updateCreator(id: string, creator: Creator): Promise<Creator> {
    return this.prismaService.creator.update({
      where: {
        id: id,
      },
      data: {
        bio: creator.bio,
        price: creator.price,
      },
    });
  }

  getVideos(creatorID: string) {
    return this.prismaService.video.findMany({
      where: {
        creator_id: creatorID,
      },
    });
  }
}
