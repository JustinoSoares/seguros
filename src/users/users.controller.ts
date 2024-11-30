import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './userCreate.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) { }

    @Post('create')
    async create(@Body() userDTO: CreateUserDto): Promise<any> {
        return this.userService.create(userDTO);
    }

    @Get('verify/:token')
    async verify(@Param('token') token: string) {
        return this.userService.verifyUser(token);
    }

    @Get('all')
    async findAll(@Query('maxLen') maxLen: string) {
        const parsedQuantity = maxLen ? parseInt(maxLen) : 3;
        return this.prisma.usuario.findMany({
            take: parsedQuantity
        });
    }

    @Get('find/:id')
    async findOne(@Param('id') id: string) {
        return this.prisma.usuario.findUnique({
            where: { id }
        });
    }
}

