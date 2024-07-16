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
        first_name: newCreator.first_name,
        last_name: newCreator.last_name,
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
            profile_picture: true,
          },
        },
      },
    });
  }
}
