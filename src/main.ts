import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
            methods: process.env.CORS_METHODS || [
                'GET',
                'PATCH',
                'POST',
                'DELETE',
                'PUT',
            ],
        },
    });
    app.use(cookieParser());
    await app.listen(process.env.PORT || 5000);
}
bootstrap();
