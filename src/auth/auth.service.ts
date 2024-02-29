import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';

interface JwtUserData {
    email: string;
    name: string;
    lastName: string;
}
export interface JwtToken {
    access_token: string;
    expires_in: number;
    user: JwtUserData;
}
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    async register(registerDto: RegisterDto) {
        if (typeof registerDto.email === 'undefined') {
            throw new ConflictException('Wrong email');
        }
        const userExists = await this.userService.findOneByEmail(
            registerDto.email
        );
        if (userExists) {
            throw new ConflictException('User email already taken');
        }
        if (typeof registerDto.password === 'undefined') {
            throw new ConflictException('Wrong password');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);

        const newUser = await this.userService.create({
            ...registerDto,
            password: hashedPassword,
        });
        const { access_token, exp } = this.generateToken(newUser);

        const returnPayload = this.generatePayload(access_token, exp, newUser);
        return returnPayload;
    }
    private generateToken(newUser: UserDto) {
        const payload = { email: newUser.email, sub: newUser.id };
        const access_token = this.jwtService.sign(payload);
        const tokenData = this.jwtService.decode(access_token);
        console.log(tokenData);
        const exp = tokenData['exp'] * 1000 - new Date().getTime();
        return { access_token, exp };
    }
    private generatePayload(
        access_token: string,
        exp: number,
        user: UserDto
    ): JwtToken {
        return {
            access_token,
            expires_in: exp,
            user: {
                email: user.email,
                name: user.name,
                lastName: user.lastName,
            },
        };
    }
    async login(loginDto: LoginDto): Promise<JwtToken> {
        const user = await this.userService.findOneByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { access_token, exp } = this.generateToken(user);
        const returnPayload = this.generatePayload(access_token, exp, user);
        return returnPayload;
    }
}
