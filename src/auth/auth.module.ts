import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => {
                console.log({
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string>('JWT_EXPIRES_IN'),
                    },
                });
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string>('JWT_EXPIRES_IN'),
                    },
                };
            },
            inject: [ConfigService],
        }),
        // JwtModule.register({
        //   secret: node.env.JWT_SECRET,
        //   signOptions: { expiresIn: '1h' },
        // }),
    ],

    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
