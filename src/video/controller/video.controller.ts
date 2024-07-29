import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('requestcount')
  async requestCount(@Req() req:any){
    const { id } = req.user;
    console.log(req.user)
    const count = await this.videoService.requestCounter(id);
    return count;
  }
}
