import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: 'http://localhost:4200',
            methods: ['GET', 'PATCH', 'POST', 'DELETE', 'PUT'],
        },
    });
    app.use(cookieParser());
    await app.listen(3000);
}
bootstrap();
