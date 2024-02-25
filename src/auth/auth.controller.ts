import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  async register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
  }
}
