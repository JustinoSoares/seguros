import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(email: string, password: string) : Promise<AuthDto> | never {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Remove campos sensíveis antes de retornar o usuário
            return user;
        }
        throw new UnauthorizedException('Credenciais inválidas');
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const payload = { sub: user.id, email: email };
        return {
            access_token: this.jwtService.sign(payload),
            expiredIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
        };
    }
}
