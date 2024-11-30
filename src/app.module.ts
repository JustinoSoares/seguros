import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { EmergenciaModule } from './emergencia/emergencia.module';
import { ParceiroModule } from './parceiro/parceiro.module';
import { GeocodingModule } from './geocoding/geocoding.module';
import { GeocodingService } from './geocoding/geocoding.service';
import { InfobipService } from './infobip/infobip.service';
import { AlertController } from './alert/alert.controller';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmergenciaModule,
    ParceiroModule,
    GeocodingModule
  ],
  controllers: [AppController, AlertController],
  providers: [AppService, InfobipService],
})
export class AppModule { }
