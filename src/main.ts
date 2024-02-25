import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'PATCH', 'POST', 'DELETE', 'PUT'],
    },
  });
  await app.listen(3000);
}
bootstrap();
