import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CreatorService } from '../service/creator.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('creators')
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  @Get()
  getTopCreators() {
    console.log(this.creatorService.getTopCreators());
    return this.creatorService.getTopCreators();
  }

  @Get('creator')
  getCreator(@Query('creatorID') creatorID: string) {
    console.log(creatorID);
    return this.creatorService.getCreator(creatorID);
  }
}
