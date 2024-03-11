import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            /*
            host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
            */
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('RDS_HOSTNAME'),
                port: configService.get<number>('RDS_PORT'),
                username: configService.get<string>('RDS_USERNAME'),
                password: configService.get<string>('RDS_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [User],
                synchronize: true,
            }),
        }),
        UsersModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
