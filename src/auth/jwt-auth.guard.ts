import { JwtToken } from './auth.service';
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException('Forbidden');
        }
        try {
            const decoded = await this.jwtService.verifyAsync<JwtToken>(token, {
                secret: this.config.get<string>('JWT_SECRET'),
            });
            request.user = decoded.user;

            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException('Invalid token');
        }
    }
    extractToken(request: any): string | null {
        const header = request.headers.authorization;
        if (header) {
            const token = header.split(' ')[1];
            if (token) {
                return token;
            }
        }
        return request.cookies?.jwt || null;
    }
}
