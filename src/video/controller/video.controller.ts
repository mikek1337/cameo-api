import { Body, Controller, Post } from '@nestjs/common';
import { VideoRequest } from '../dto/videoRequest';
import { VideoService } from '../service/video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('request')
  async requestVideo(@Body() videoRequest: VideoRequest) {
    const makeRequest = await this.videoService.createVideoRequest(
      videoRequest,
    );
    if (makeRequest) {
      return { message: 'Request has been made' };
    }
    return { message: 'Request failed' };
  }
}
