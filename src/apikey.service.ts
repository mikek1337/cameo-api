import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ApiKeyService {
  constructor(private configService: ConfigService) {}
  async generateApiKey(): Promise<string> {
    const saltOrRounds = 10;
    const seed = process.env.API_KEY_SEED;
    const apiKey = await promisify(bcrypt.hash)(seed, saltOrRounds);

    return apiKey;
  }
  async validateApiKey(apiKey: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(process.env.API_KEY_SEED, apiKey);
    return isMatch;
  }
}
