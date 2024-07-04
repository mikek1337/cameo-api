import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyService } from '../apikey.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      return false;
    }
    console.log(await this.apiKeyService.validateApiKey(apiKey));
    return await this.apiKeyService.validateApiKey(apiKey);
  }
}
