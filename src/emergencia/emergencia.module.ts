import { Module } from '@nestjs/common';
import { EmergenciaService } from './emergencia.service';
import { EmergenciaController } from './emergencia.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [PrismaModule, ConfigModule],
  providers: [EmergenciaService],
  exports: [EmergenciaService],
  controllers: [EmergenciaController],
})
export class EmergenciaModule {}
