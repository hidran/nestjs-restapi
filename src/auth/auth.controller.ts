import { Body, Controller, Post, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private config: ConfigService
    ) {}
    private getCookieConf() {
        const secure = this.config.get<string>('SECURE_COOKIE');
        const ttl = this.config.get<number>('TTL_COOKIE') ?? 3600000;
        const result = {
            httpOnly: true,
            secure: secure === 'false' || secure === '0' ? false : true,
            maxAge: +ttl,
        };
        console.log(result);
        return result;
    }
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const result = await this.authService.login(loginDto);
        res.cookie('jwt', result.access_token, this.getCookieConf());
        return res.send(result);
    }
    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
        const result = await this.authService.register(registerDto);
        res.cookie('jwt', result.access_token, this.getCookieConf());
        return res.send(result);
    }
}
