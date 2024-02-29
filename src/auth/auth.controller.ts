import { Body, Controller, Post, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const result = await this.authService.login(loginDto);
        res.cookie('jwt', result.access_token, {
            httpOnly: true,
            secure: true,
        });
        return res.send(result);
    }
    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
        const result = await this.authService.register(registerDto);
        res.cookie('jwt', result.access_token, {
            httpOnly: true,
            secure: true,
        });
        return res.send(result);
    }
}
