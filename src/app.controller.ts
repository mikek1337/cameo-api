import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyService } from './apikey.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiKeyService: ApiKeyService,
  ) {}
  @UseGuards(GoogleOAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('genenrate-api-key')
  generateApiKey() {
    return this.apiKeyService.generateApiKey();
  }
}
