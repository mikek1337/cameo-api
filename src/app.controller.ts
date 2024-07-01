import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './apikey.guard';
import { ApiKeyService } from './apikey.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiKeyService: ApiKeyService,
  ) {}
  @UseGuards(ApiKeyGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('genenrate-api-key')
  generateApiKey() {
    return this.apiKeyService.generateApiKey();
  }
}
