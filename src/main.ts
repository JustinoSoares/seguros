// api/hello.ts
import { Handler } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  // Habilitando CORS (se necessário)
  app.enableCors();

  await app.init();
}

bootstrap();

export const handler: Handler = server;
