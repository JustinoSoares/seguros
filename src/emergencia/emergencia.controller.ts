import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmergenciaService } from './emergencia.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { createEmergenciaDto } from './createEmergencia.dto';
import { v4 as uuid } from 'uuid';

@Controller('emergencia')
export class EmergenciaController {
    constructor(
        private readonly emergenciaService: EmergenciaService,
        private readonly prisma: PrismaService,
        private readonly ConfigService: ConfigService,
    ) { }

    @Get('find/:id')
    async find(@Param('id') id: string) {
        return this.prisma.emergencia.findUnique({
            where: { id }
        });
    }
}