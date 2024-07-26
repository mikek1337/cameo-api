import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { VideoRequest } from '../dto/videoRequest';
import { VideoService } from '../service/video.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('request')
  async requestVideo(@Body() videoRequest: VideoRequest, @Req() req: any) {
    const { id } = req.user;
    videoRequest.consumerID = id;
    const makeRequest = await this.videoService.createVideoRequest(
      videoRequest,
    );
    if (makeRequest) {
      return { message: 'Request has been made' };
    }
    return { message: 'Request failed' };
  }
}
