import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './userCreate.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { EmailService } from '../email/email.service';
@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
    ) {}

    async create(userDTO: CreateUserDto) {
        const findUser = await this.prisma.usuario.findUnique({ where: { email: userDTO.email } });
        if (findUser) {
            return {
                status: false,
                msg: 'User already exists',
                statusCode: 400,
            };
        }
        const id = uuid();
        const hashedPassword = await bcrypt.hash(userDTO.senha, 10);

        // Gerar o link de verificação
        const verificationLink = `yame-api-git-main-justino-soares-projects.vercel.app/users/verify/${id}`;

        // Enviar o e-mail de verificação
        await this.emailService.sendVerificationEmail(userDTO.email, verificationLink);

        return this.prisma.usuario.create({
            data: { ...userDTO, senha: hashedPassword, id },
        });
    }

    async verifyUser(token: string): Promise<boolean> {
        const user = await this.prisma.usuario.findUnique({
            where: { id: token },
        });
        console.log(user);
        if (!user) {
            return false;
        }
        await this.prisma.usuario.update({
            where: { id: token },
            data: { ativo: true },
        });
        return true;
    }
}
