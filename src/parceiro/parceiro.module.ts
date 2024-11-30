import { Module } from '@nestjs/common';
import { ParceiroService } from './parceiro.service';
import { ParceiroController } from './parceiro.controller';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { HttpModule } from '@nestjs/axios';  // Importando o HttpModule aqui
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ParceiroService],
  controllers: [ParceiroController],
  exports: [ParceiroService],
  imports : [GeocodingModule, HttpModule, PrismaModule]
})
export class ParceiroModule {}
