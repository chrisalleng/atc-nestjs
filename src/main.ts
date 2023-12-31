import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {abortOnError: false, logger: ['debug', 'error', 'log', 'verbose', 'warn']});
  await app.listen(3000);
}
bootstrap();