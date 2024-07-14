import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const frontendURL = configService.get('FRONTEND_URL');
  console.log(frontendURL);
  app.use(cookieParser());
  if (frontendURL) {
    app.enableCors({
      origin:frontendURL,
      credentials: true,
    });
  }
  await app.listen(3000);
}
bootstrap();
