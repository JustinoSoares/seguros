import { Module } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { HttpModule } from '@nestjs/axios';  // Importando o HttpModule para ter o HttpService

@Module({
  imports: [HttpModule],  // Importando o HttpModule aqui
  providers: [GeocodingService],
  exports: [GeocodingService],  // Certifique-se de exportar se for usar em outros módulos
})
export class GeocodingModule {}
