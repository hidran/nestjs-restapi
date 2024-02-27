import { ConflictException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    if (typeof registerDto.email === 'undefined') {
      throw new ConflictException('Wrong email');
    }
    const userExists = await this.userService.findOneByEmail(registerDto.email);
    if (userExists) {
      throw new ConflictException('User email already taken');
    }
    if (typeof registerDto.password === 'undefined') {
      throw new ConflictException('Wrong password');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    const newUser = this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return newUser;
  }
  async login(loginDto: LoginDto) {
    return [];
  }
}
