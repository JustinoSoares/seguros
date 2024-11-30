import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly email: EmailService,
    ) { }

    async validateUser(email: string): Promise<AuthDto> | never {
        const user = await this.prisma.usuario.findUnique({ where: { email } });
        if (user) {
            const verify = Math.floor(1000 + Math.random() * 9000);
            const message = `Número de verificação: ${verify}`
            user.email_verify = message;
            await this.prisma.usuario.update({
                where: { email },
                data: { email_verify:  verify.toString() },
            });
            this.email.sendEmail(user.email, message);
            return user;
        }
        throw new UnauthorizedException('Este Email não está registrado');
    }
b
    async login(email_verify: string) {
        const user = await this.prisma.usuario.findFirst({
            where : {email_verify : email_verify}
        });
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const payload = { sub: user.id, rules : user.rules };
        await this.prisma.usuario.update({
            where: { email : user.email },
            data: { email_verify: null },
        });
        return {
            access_token: this.jwtService.sign(payload),
            expiredIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
            id: user.id,
        };
    }
}
